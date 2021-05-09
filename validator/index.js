const userSignUpValidator = (req,res,next) => {
    req.check( 'name', 'Name is Required').notEmpty()
    req.check('email', 'Email Must be Between 3 to 32 Characters')
    .matches(/.+\@.+\..+/)
    .withMessage('Email Must Contain @')
    .isLength({
        min:4,
        max:32
    })
    req.check('password','Password is Required').notEmpty()
    req.check('password')
    .isLength({min:8})
    .withMessage('Password Must Contain at least 8 Characters')
    .matches(/\d/)
    .withMessage('password Must Contain a Number')

    const errors = req.validationErrors()
    if (errors){
        const firstError = errors.map( error=> error.msg )[0]
        return res.status(400).json({ error:firstError })
    }
    next()
}

module.exports = { userSignUpValidator }