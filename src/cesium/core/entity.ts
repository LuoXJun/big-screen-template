import * as Cesium from 'cesium';
import { getViewer } from './viewer';

/** 实体池：按 name 跟踪管理，便于查找与统一清理 */
const entityPool = new Map<string, Cesium.Entity>();

export function addEntity(name: string, options: Cesium.Entity.ConstructorOptions = {}): Cesium.Entity {
    const entity = getViewer().entities.add({ name, ...options });
    entityPool.set(name, entity);
    return entity;
}

export function getEntity(name: string): Cesium.Entity | undefined {
    return entityPool.get(name);
}

export function hasEntity(name: string): boolean {
    return entityPool.has(name);
}

export function removeEntity(name: string): void {
    const entity = entityPool.get(name);
    if (!entity) return;
    getViewer().entities.remove(entity);
    entityPool.delete(name);
}

export function removeAllEntities(): void {
    entityPool.clear();
    getViewer().entities.removeAll();
}
