const Vehicle = require('../schemas/vehicle-schema');

class VehicleRepository {

    async getAllVehicles(page = 1) {
        const limit = 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const totalDocuments = await Vehicle.countDocuments();
        const totalPages = Math.ceil(totalDocuments / limit);

        const vehicles = await Vehicle.find().skip(startIndex).limit(limit);

        return {
            vehicles,
            totalPages,
            currentPage: page,
            totalDocuments
        };
    }

    async searchVehicles(filters) {
        const query = {};

        if (filters.placa) query.placa = filters.placa;
        if (filters.segure_number) query.segure_number = filters.segure_number;
        if (filters.modelo) query.MODEL = filters.modelo;
        if (filters.year) query.YEAR = filters.year;
        if (filters.brand) query.BRAND = filters.brand;

        return await Vehicle.find(query);
    }

    async getVehicleById(vehicleId) {
        return await Vehicle.findById(vehicleId);
    }

    async createVehicle(vehicleData) {
        return await Vehicle.create(vehicleData);
    }

    async updateVehicle(vehicleId, updatedVehicleData) {
        return await Vehicle.findByIdAndUpdate(vehicleId, updatedVehicleData, { new: true });
    }

    async deleteVehicle(vehicleId) {
        return await Vehicle.findByIdAndDelete(vehicleId);
    }
}

module.exports = VehicleRepository;
