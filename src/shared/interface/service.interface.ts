export interface ServiceInterface<T, U> {
    create(entityDto: U): Promise<T>
    findAll(): Promise<T[]>
    findOneById(id: string): Promise<T>
}
