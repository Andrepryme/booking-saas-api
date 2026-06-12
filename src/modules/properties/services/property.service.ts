import type { CreatePropertyInput } from "../validators/create-property.validator.js";
import type { Property, PropertyResponse, PaginationOptions, PaginatedResult } from "../types/property.types.js";
import type { PropertySearchInput } from "../validators/property-search.validator.js";
import type { PropertyRepository } from "../repositories/property.repository.js";
import { PropertyNotFoundError } from "../../../shared/errors/PropertyNotFoundError.js";

export class PropertyService {

    private readonly propertyRepository: PropertyRepository;

    constructor(propertyRepository: PropertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    private toPropertyResponse(property: Property): PropertyResponse {

        return {
            id: property.id,
            hostId: property.hostId,
            title: property.title,
            description: property.description,
            pricePerNight: property.pricePerNight,
            country: property.country,
            city: property.city,
            address: property.address,
            maxGuests: property.maxGuests,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            createdAt: property.createdAt
        };
    }

    async create(hostId: string, data: CreatePropertyInput): Promise<PropertyResponse> {

        const property = await this.propertyRepository.create({
            hostId,
            title: data.title,
            description: data.description,
            pricePerNight: data.pricePerNight,
            country: data.country,
            city: data.city,
            address: data.address,
            maxGuests: data.maxGuests,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms
        });
        return this.toPropertyResponse(property);
    }

    async findById(id: string): Promise<PropertyResponse> {
        const property = await this.propertyRepository.findById(id);
        if (!property) {
            throw new PropertyNotFoundError({ propertyId: id });
        }
        return this.toPropertyResponse(property);
    }

    async findByHostId(hostId: string): Promise<PropertyResponse[]> {
        const properties = await this.propertyRepository.findByHostId(hostId);
        return properties.map((property) => this.toPropertyResponse(property));
    }

    async findMany(filters: PropertySearchInput, pagination: PaginationOptions): Promise<PaginatedResult<PropertyResponse>
    > {

        const result = await this.propertyRepository.findMany(filters, pagination);

        return {
            // spread the original result to include total, page, limit, totalPages
            ...result,
            // map the data array in result to convert each Property to PropertyResponse
            data: result.data.map((property) => this.toPropertyResponse(property))
        };
    }
}