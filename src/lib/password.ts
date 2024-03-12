import bcrypt from 'bcryptjs';
// Separate function for password validation (replace with your implementation)
async function verifyPassword(plainPassword: string, hashedPassword: string) {
    // Use a secure hashing library (e.g., bcrypt) to compare passwords
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
}


export { verifyPassword }