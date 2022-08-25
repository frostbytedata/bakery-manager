import { Injectable } from '@nestjs/common';
import {
  MongoRepository,
  Repository,
  SelectQueryBuilder,
  TreeRepository,
} from 'typeorm';
import { PaginationOptions } from '../types/pagination-options';
import { RelationsOptions } from '../types/relations-options';
import { WhereQuery } from '../types/where-query';

@Injectable()
export class StandardService {
  private _maxReturned: number = 20;

  constructor() {}

  public get maxReturned() {
    return this._maxReturned;
  }

  public set maxReturned(_maxReturned: number) {
    this._maxReturned = _maxReturned || 20;
  }

  find(
    repoName: string,
    repo: Repository<any> | MongoRepository<any> | TreeRepository<any>,
    relations: RelationsOptions[],
    query: WhereQuery,
    pagination: PaginationOptions,
  ): SelectQueryBuilder<any> {
    let sql = repo.createQueryBuilder(repoName);
    if (relations && relations.length > 0) {
      relations.forEach((relation) => {
        sql.leftJoinAndSelect(
          relation.property,
          relation.alias,
          relation.condition,
        );
      });
    }
    if (pagination) {
      sql.skip(pagination.skip);
      sql.take(pagination.take);
    }
    sql = sql.where(query.queryString, query.params);
    return sql;
  }

  async findAll(
    repo: Repository<any> | MongoRepository<any> | TreeRepository<any>,
    pagination: PaginationOptions,
  ) {
    const [results, total] = await repo.findAndCount(
      pagination.query(this.maxReturned),
    );
    return {
      data: results,
      total: total,
    };
  }
}
