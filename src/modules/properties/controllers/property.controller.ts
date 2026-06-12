import type { Request, Response } from "express";
import type { PropertyService } from "../services/property.service.js";
import { propertySearchSchema, propertyPaginationSchema } from "../validators/property-search.validator.js";

export class PropertyController {

    private readonly propertyService: PropertyService;

    constructor(propertyService: PropertyService) {
        this.propertyService = propertyService;
    }

    async create(req: Request, res: Response): Promise<void> {
        const property = await this.propertyService.create(req.user!.id, req.body);
        res.status(201).json({
            success: true,
            data: property
        });
    }

    async findById(req: Request, res: Response): Promise<void> {
        const property = await this.propertyService.findById(req.params.id as string);
        res.status(200).json({
            success: true,
            data: property
        });
    }

    async findMyProperties(req: Request, res: Response): Promise<void> {

        const properties = await this.propertyService.findByHostId(req.user!.id);
        res.status(200).json({
            success: true,
            data: properties
        });
    }

    async findMany(req: Request, res: Response): Promise<void> {
        const searchQuery = propertySearchSchema.parse(req.query);
        const paginationQuery = propertyPaginationSchema.parse(req.query);

        const result = await this.propertyService .findMany(
            { city: searchQuery.city, minPrice: searchQuery.minPrice, maxPrice: searchQuery.maxPrice, minGuests: searchQuery.minGuests, bedrooms: searchQuery.bedrooms, isActive: searchQuery.isActive  },
            { page: paginationQuery.page, limit: paginationQuery.limit, sortBy: paginationQuery.sortBy, sortOrder: paginationQuery.sortOrder}
            
        );

    res.status(200).json({
    success: true,
    data: result
    });
    }
}