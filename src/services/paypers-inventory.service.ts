import {Component, Inject} from '@nestjs/common';
import {Repository} from 'typeorm';
import {PaypersInventory} from '../entities/paypers_inventory';
import {UpdateInventoryDto} from '../dto/paypers-inventory/update-inventory.dto';

@Component()
export class PaypersInventoryService {

    constructor(
        @Inject('PaypersInventoryRepositoryToken') private readonly paypersInventoryRepository: Repository<PaypersInventory>) {}

    async find(where) {
        return this.paypersInventoryRepository.find({ where });
    }

    async update(data: UpdateInventoryDto) {
        let inventory = await this.paypersInventoryRepository.findOne({
            where: {
                customer_id: data.customer_id,
                payper_id: data.payper_id,
            },
        });

        if ( ! inventory) {
            inventory = new PaypersInventory();
            inventory.payper_id = data.payper_id;
            inventory.customer_id = data.customer_id;
        }

        inventory.quantity = (inventory.quantity || 0) + data.quantity;

        return await this.paypersInventoryRepository.save(inventory);
    }
}