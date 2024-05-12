   /***********************************************************
     * Updates the fields of a user object based on the provided body object.
     * @param {Object} body - The object containing the updated field values.
     * @param {Object} user - The user object to be updated.
     * @returns {Object} - An object containing the updated fields.
     **********************************************************/
   function updateFields(body,object) {
    // create a object to store the updated fields
    const updatedFields = {};
    
     // get the keys of the body object
     const keys = Object.keys(body);

     // iterate over the keys
     keys.forEach(key => {
         if (object[key] !== body[key]) {
             // if the fiels is different from the user object (object in the database)
             // then add the field to the updatedFields object
             updatedFields[key] = body[key];
         }
     });
     return updatedFields;
}

export default updateFields;