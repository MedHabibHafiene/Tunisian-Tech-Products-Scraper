import bcrypt from 'bcrypt'

const hashedPwd = async(password : string)=>{
    const salt = await bcrypt.genSalt(12);
    const hashedPwd = await bcrypt.hash(password, salt);
    return hashedPwd
}

export default hashedPwd