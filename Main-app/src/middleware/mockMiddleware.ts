import { Request, Response, NextFunction } from 'express';

const mockVerifyToken = (req: Request, res: Response, next: NextFunction) => {
    next();
};

export default mockVerifyToken;
