const validateEditProfileData = (req) => {
    const isAllowedData = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "description",
      "photoId",
      "skills",
    ];
  
    const isEditAllowed = Object.keys(req.body).every((field) =>
      isAllowedData.includes(field)
    );
  
    return isEditAllowed;
  };
  
  module.exports = {
    validateEditProfileData,
  };