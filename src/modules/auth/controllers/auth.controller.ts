import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

export class AuthController {

  private readonly authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async register(req: Request, res: Response): Promise<void> {
    const authResponse = await this.authService.register({
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    res.status(201).json({
      success: true,
      data: authResponse
    });
  }

  async login(req: Request, res: Response): Promise<void> {
    const authResponse = await this.authService.login({
      email: req.body.email, 
      password: req.body.password
     });
    res.status(200).json({
      success: true,
      data: authResponse
    });
  }

  async me(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      success: true,
      data: req.user
    });
  }

  async adminTest(_req: Request, res: Response): Promise<void> {
    res.status(200).json({
      success: true,
      message: "Admin access granted"
    });
  }
}