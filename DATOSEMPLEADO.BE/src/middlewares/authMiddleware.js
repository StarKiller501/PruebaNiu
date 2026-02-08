import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No se proporcionó token de seguridad' });
    }

    try {
        // El token suele venir como "Bearer eyJhbGci...", por lo que se extrae el token real
        const tokenReal = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

        const decoded = jwt.verify(tokenReal, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};