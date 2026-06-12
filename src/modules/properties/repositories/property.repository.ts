import { db } from "../../../infrastructure/database/db.js";
import type { Property, CreatePropertyData, PaginationOptions, PaginatedResult, PropertyRow } from "../types/property.types.js";
import type { PropertySearchInput } from "../validators/property-search.validator.js";
export class PropertyRepository {

    private mapRowToProperty(row: PropertyRow): Property {

        return {
        id: row.id,

        hostId: row.host_id,

        title: row.title,
        description: row.description,

        pricePerNight:
        Number(
            row.price_per_night
        ),

        country: row.country,
        city: row.city,
        address: row.address,

        maxGuests:
        row.max_guests,

        bedrooms:
        row.bedrooms,

        bathrooms:
        row.bathrooms,

        isActive:
        row.is_active,

        createdAt:
        row.created_at,

        updatedAt:
        row.updated_at
        };
    }    

    async create(data: CreatePropertyData): Promise<Property> {
        const result = await db.query<PropertyRow>(
            `
            INSERT INTO properties (host_id, title, description, price_per_night, country, city, address, max_guests, bedrooms, bathrooms)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 )
            RETURNING *
            `,
            [data.hostId, data.title, data.description, data.pricePerNight, data.country, data.city, data.address, data.maxGuests, data.bedrooms, data.bathrooms]
        );
        return this.mapRowToProperty(result.rows[0]!);
    }

    async findById(id: string): Promise<Property | null> {
        const result = await db.query<PropertyRow>(
            `
            SELECT * FROM properties WHERE id = $1
            `,
            [id]
        );
        return result.rows[0] ? this.mapRowToProperty(result.rows[0]) : null;
    }

    async findByHostId(hostId: string): Promise<Property[]> {
        const result = await db.query<PropertyRow>(
                `SELECT * FROM properties WHERE host_id = $1 ORDER BY created_at DESC`,
                [hostId]
            );
        return result.rows.map((row) => this.mapRowToProperty(row));
    }

    async findMany(filters: PropertySearchInput, pagination: PaginationOptions): Promise<PaginatedResult<Property>> {

        let where: string = `WHERE 1=1`;
        let index: number = 1;
        const values: unknown[] = [];


        if (filters.city) {
            where += ` AND city ILIKE $${index++}`;
            values.push(`%${filters.city}%`);
        }
        
        if (filters.minPrice !== undefined) {
            where += ` AND price_per_night >= $${index++}`;
            values.push(filters.minPrice);
        }

        if (filters.maxPrice !== undefined) {
            where += ` AND price_per_night <= $${index++}`;
            values.push(filters.maxPrice);
        }

        if (filters.minGuests !== undefined) {
            where += ` AND max_guests >= $${index++}`;
            values.push(filters.minGuests);
        }

        if (filters.bedrooms !== undefined) {
            where += ` AND bedrooms = $${index++}`;
            values.push(filters.bedrooms);
        }

        if (filters.isActive !== undefined) {
            where += ` AND is_active = $${index++}`;
            values.push(filters.isActive);
        }

        // We need to run a separate query to get the total count of records matching the filters, without pagination.
        const countResult = await db.query<{ count: string; }>(
            `SELECT COUNT(*) AS count FROM properties ${where}`,
            values
        );
        const total = Number(countResult.rows[0]!.count);

        // Now we can run the main query to get the paginated results.
        const page = Math.max(pagination.page, 1);
        const limit = Math.max(pagination.limit, 1);
        const offset = (page - 1) * limit;

        
        let orderBy = ` ORDER BY created_at DESC`;

        if (pagination.sortBy === "price") {
            orderBy = `ORDER BY price_per_night 
            ${pagination.sortOrder === "asc" ? "ASC" : "DESC"}`;
        }

        const query = `
            SELECT * FROM properties
            ${where}
            ${orderBy}
            LIMIT $${index++} OFFSET $${index++}
        `;
        values.push(limit, offset);
        const result = await db.query<PropertyRow>(query, values);

        // We return the paginated result, including the total count and total pages for client-side pagination handling.
        return {
            data: result.rows.map((row) => this.mapRowToProperty(row)),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    }

}