/*
 Importing modules and schemas
*/

const User = require('../models/User');

/*
Index: Returns a list of sessions
Show: Returns a unique session
Store:  Creates a session
Update: Modify a session
Destroy: Delete a session 
*/

module.exports = {
  async store(req, res) {
    const { email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }
    
    return res.json(user);
  }
};