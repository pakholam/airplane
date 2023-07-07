import { _decorator, BoxCollider, Component, ITriggerEvent, Node } from 'cc';
import { Constant } from '../framework/Constant';
import { PoolManager } from '../framework/PoolManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Bullet
 * DateTime = Thu Jun 29 2023 12:08:22 GMT+0800 (中国标准时间)
 * Author = cerf_baleine
 * FileBasename = Bullet.ts
 * FileBasenameNoExtension = Bullet
 * URL = db://assets/script/bullet/Bullet.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('Bullet')
export class Bullet extends Component {
    // 关闭外面配置
    // @property
    // public bulletSpeed = 1;
    private _bulletSpeed = 0;

    private _isEnemyBullet = false;

    private _direction = Constant.Direction.MIDDLE;

    onEnable(): void {
        const collider = this.getComponent(BoxCollider);
        collider.on('onTriggerEnter', this._onTriggerEnter, this);
    }

    onDisable(): void {
        const collider = this.getComponent(BoxCollider);
        collider.off('onTriggerEnter', this._onTriggerEnter, this);
    }

    update(deltaTime: number): void {
        const pos = this.node.position;
        let moveLength = 0;
        if (this._isEnemyBullet) {
            moveLength = pos.z + this._bulletSpeed;

            this.node.setPosition(pos.x, pos.y, moveLength);
            if (moveLength > 50) {
                PoolManager.instance().putNode(this.node);
            }
        } else {
            moveLength = pos.z - this._bulletSpeed;
            if (this._direction === Constant.Direction.LEFT) {
                this.node.setPosition(pos.x - this._bulletSpeed * 0.2, pos.y, moveLength);
            } else if (this._direction === Constant.Direction.RIGHT) {
                this.node.setPosition(pos.x + this._bulletSpeed * 0.2, pos.y, moveLength);
            } else {
                this.node.setPosition(pos.x, pos.y, moveLength);
            }
            if (moveLength < -50) {
                PoolManager.instance().putNode(this.node);
            }
        }
    }

    // 在show里定义的都是对象被创建的时候初始化需要的一些配置，若是后续频繁修改，就不要写在这里
    show(speed: number, isEnemyBullet: boolean, direction: number = Constant.Direction.MIDDLE) {
        this._bulletSpeed = speed;
        this._isEnemyBullet = isEnemyBullet;
        this._direction = direction;
    }

    private _onTriggerEnter(event: ITriggerEvent) {
        PoolManager.instance().putNode(this.node);
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 */
