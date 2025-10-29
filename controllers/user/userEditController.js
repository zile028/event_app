/**
 * User Edit Controller
 * Handles user profile editing functionality including avatar uploads and password changes
 */

const UserModel = require("../../models/UserModel");
const bcrypt = require("bcryptjs");
const path = require("path");

/**
 * Display user edit form
 * Renders the profile editing page with current user data
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const userEditView = async (req, res) => {
  try {
    const userId = req.session.user._id;

    // Fetch complete user data from database
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).render("error", {
        message: "Korisnik nije pronađen",
        user: req.session.user,
      });
    }

    // Render edit profile page
    res.render("user/edit", {
      user: user,
      sessionUser: req.session.user,
      title: "Edituj profil",
      message: null,
      errors: null,
    });

  } catch (error) {
    console.error("Greška pri učitavanju edit forme:", error);
    res.status(500).render("error", {
      message: "Došlo je do greške pri učitavanju edit forme",
      user: req.session.user,
    });
  }
};

/**
 * Process user profile update
 * Handles form submission with validation, file upload, and password changes
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const userEditPost = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const {
      firstName,
      lastName,
      email,
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    // Get current user from database
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).render("error", {
        message: "Korisnik nije pronađen",
        user: req.session.user,
      });
    }

    let errors = [];
    let updateData = {};

    // Validate basic user data
    if (firstName && firstName.trim().length >= 3) {
      updateData.firstName = firstName.trim();
    } else if (firstName) {
      errors.push("Ime mora da sadrži najmanje 3 karaktera");
    }

    if (lastName && lastName.trim().length >= 3) {
      updateData.lastName = lastName.trim();
    } else if (lastName) {
      errors.push("Prezime mora da sadrži najmanje 3 karaktera");
    }

    // Email validation and uniqueness check
    if (email && email.trim() !== user.email) {
      const existingUser = await UserModel.findOne({
        email: email.trim(),
        _id: { $ne: userId },
      });
      
      if (existingUser) {
        errors.push("Email adresa je već u upotrebi");
      } else {
        updateData.email = email.trim();
      }
    }

    // Avatar upload handling
    if (req.files && req.files.avatar) {
      const avatar = req.files.avatar;
      const allowedTypes = [
        "image/jpeg",
        "image/jpg", 
        "image/png",
        "image/gif",
      ];

      // File validation
      if (!allowedTypes.includes(avatar.mimetype)) {
        errors.push("Dozvoljena su samo JPG, PNG i GIF formatovanja");
      } else if (avatar.size > 5 * 1024 * 1024) {
        errors.push("Fajl ne sme biti veći od 5MB");
      } else {
        // Generate unique filename and upload
        const fileName = Date.now() + path.extname(avatar.name);
        const uploadPath = path.join(
          __dirname,
          "../../public/uploads/",
          fileName
        );

        try {
          await avatar.mv(uploadPath);
          updateData.avatar = `uploads/${fileName}`;
        } catch (uploadError) {
          console.error("Greška pri upload-u avatara:", uploadError);
          errors.push("Greška pri upload-u slike");
        }
      }
    }

    // Password validation and update
    if (newPassword) {
      if (!currentPassword) {
        errors.push("Morate uneti trenutnu lozinku");
      } else {
        // Verify current password
        const isCurrentPasswordValid = await bcrypt.compare(
          currentPassword,
          user.password
        );

        if (!isCurrentPasswordValid) {
          errors.push("Trenutna lozinka nije tačna");
        } else if (newPassword.length < 6) {
          errors.push("Nova lozinka mora da sadrži najmanje 6 karaktera");
        } else if (newPassword !== confirmPassword) {
          errors.push("Nova lozinka i potvrda lozinke se ne slažu");
        } else {
          // Hash new password
          updateData.password = await bcrypt.hash(newPassword, 10);
        }
      }
    }

    // Return with errors if validation failed
    if (errors.length > 0) {
      return res.render("user/edit", {
        user: user,
        sessionUser: req.session.user,
        title: "Edituj profil",
        message: null,
        errors: errors,
      });
    }

    // Update user in database
    if (Object.keys(updateData).length > 0) {
      await UserModel.findByIdAndUpdate(userId, updateData);

      // Update session data if basic info was changed
      if (
        updateData.firstName ||
        updateData.lastName ||
        updateData.email ||
        updateData.avatar
      ) {
        const updatedUser = await UserModel.findById(userId);
        req.session.user = {
          _id: updatedUser._id,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          role: updatedUser.role,
          avatar: updatedUser.avatar,
        };
      }
    }

    // Successful update - redirect to profile page
    res.redirect("/user/profile?success=true");

  } catch (error) {
    console.error("Greška pri ažuriranju profila:", error);
    res.status(500).render("error", {
      message: "Došlo je do greške pri ažuriranju profila",
      user: req.session.user,
    });
  }
};

module.exports = {
  userEditView,
  userEditPost,
};
