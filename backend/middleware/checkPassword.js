module.exports = (req, res, next) => {
  const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //Huit caractères au minimum et un chiffre

  if (passwordReg.test(req.body.password)) {
    next();
  } else {
    res
      .status(400)
      .json({
        message:
          "Le mot de passe doit contenir au moins, huit caractères au minimum et un chiffre",
      });
  }
};
