import {Component, Inject} from '@nestjs/common';
import {Repository} from 'typeorm';
import {PaxOrder} from '../entities/pax_orders';
import {CreatePaxOrderDto} from '../dto/pax-order/create-pax-order.type.dto';
import {OrderStatus} from '../entities/orders_statuses';
import {ORDER_PENDING} from '../common/constants/order-statuses.types';
import {OrderType} from '../entities/orders_types';
import {Wallet} from '../entities/wallets';

@Component()
export class PaxOrdersService {

    constructor(
        @Inject('PaxOrderRepositoryToken') private readonly paxOrderRepository: Repository<PaxOrder>,
        @Inject('WalletRepositoryToken') private readonly walletRepository: Repository<Wallet>,
        @Inject('OrderTypeRepositoryToken') private readonly orderTypeRepository: Repository<OrderType>,
        @Inject('OrderStatusRepositoryToken') private readonly orderStatusRepository: Repository<OrderStatus>,
    ) {}

    public async create(data: CreatePaxOrderDto) {
        const paxOrder = new PaxOrder();
        paxOrder.order_status_id = await this.orderStatusRepository.findOneById(ORDER_PENDING);
        paxOrder.order_type_id = await this.orderTypeRepository.findOneById(data.order_type_id);
        paxOrder.wallet_id = await this.walletRepository.findOneById(data.wallet_id);
        paxOrder.request_amount = data.request_amount;
        paxOrder.remaining_amount = data.request_amount;
        paxOrder.price = data.price;

        return await this.paxOrderRepository.save(paxOrder);
    }

    public async getAll(query) {
        return await this.paxOrderRepository.find({ where: query, relations: ['order_type_id', 'order_status_id'] });
    }

    public async get(id) {
        return await this.paxOrderRepository.findOneById(id, {relations: ['order_type_id', 'order_status_id'] });
    }
}