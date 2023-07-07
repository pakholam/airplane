import { _decorator, BoxCollider, Component, ITriggerEvent, Node, Vec3 } from 'cc';
import { Constant } from '../framework/Constant';
import { GameManager } from '../framework/GameManager';
import { PoolManager } from '../framework/PoolManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = EnemyPlane
 * DateTime = Fri Jun 30 2023 09:26:07 GMT+0800 (中国标准时间)
 * Author = cerf_baleine
 * FileBasename = EnemyPlane.ts
 * FileBasenameNoExtension = EnemyPlane
 * URL = db://assets/script/plane/EnemyPlane.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

const OUTOFBOUNCE = 50;

@ccclass('EnemyPlane')
export class EnemyPlane extends Component {
    @property
    public createBulletTime: number = 0.5;

    // 由于游戏小，在gamemanager中设置，不用在外面配置
    // @property
    // public enemySpeed = 1;
    private _enemySpeed: number = 0;
    private _needBullet: boolean = false;
    private _gameManager: GameManager = null;

    private _curCreateBulletTime = 0;

    public enemyType = Constant.EnemyType.TYPE1;

    onEnable(): void {
        const collider = this.getComponent(BoxCollider);
        collider.on('onTriggerEnter', this._onTriggerEnter, this);
    }

    onDisable(): void {
        const collider = this.getComponent(BoxCollider);
        collider.off('onTriggerEnter', this._onTriggerEnter, this);
    }

    update(deltaTime: number) {
        const pos: Vec3 = this.node.position;
        const movePos: number = pos.z + this._enemySpeed;
        this.node.setPosition(pos.x, pos.y, movePos);

        if (this._needBullet) {
            this._curCreateBulletTime += deltaTime;
            if (this._curCreateBulletTime > this.createBulletTime) {
                this._gameManager.createEnemyBullet(this.node.position);
                this._curCreateBulletTime = 0;
            }
        }

        if (movePos > OUTOFBOUNCE) {
            PoolManager.instance().putNode(this.node);
        }
    }

    // 在show里定义的都是对象被创建的时候初始化需要的一些配置，若是后续频繁修改，就不要写在这里
    show(gameManager: GameManager, speed: number, needBullet: boolean) {
        this._gameManager = gameManager;
        this._enemySpeed = speed;
        this._needBullet = needBullet;
    }

    private _onTriggerEnter(event: ITriggerEvent) {
        const collisionGroup = event.otherCollider.getGroup();
        if (
            collisionGroup === Constant.CollisionType.SELF_PLANE ||
            collisionGroup === Constant.CollisionType.SELF_BULLET
        ) {
            this._gameManager.playAudioEffect('enemy');
            PoolManager.instance().putNode(this.node);
            this._gameManager.addScore();
            this._gameManager.createEnemyEffect(this.node.position);
        }
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
