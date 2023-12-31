import { _decorator, AudioSource, BoxCollider, Component, EventTouch, ITriggerEvent, Node, Touch } from 'cc';
import { Constant } from '../framework/Constant';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = SelfPlane
 * DateTime = Thu Jun 29 2023 10:56:58 GMT+0800 (中国标准时间)
 * Author = cerf_baleine
 * FileBasename = SelfPlane.ts
 * FileBasenameNoExtension = SelfPlane
 * URL = db://assets/script/SelfPlane.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('SelfPlane')
export class SelfPlane extends Component {
    @property(Node)
    public explode: Node = null;

    @property(Node)
    public bloodFace: Node = null;

    @property(Node)
    public blood: Node = null;

    public lifeValue = 10;
    public isDie = false;

    private _currLife = 0;
    private _audioSource: AudioSource = null;

    start(): void {
        this._audioSource = this.getComponent(AudioSource);
    }

    onEnable(): void {
        const collider = this.getComponent(BoxCollider);
        collider.on('onTriggerEnter', this._onTriggerEnter, this);
    }

    onDisable(): void {
        const collider = this.getComponent(BoxCollider);
        collider.off('onTriggerEnter', this._onTriggerEnter, this);
    }

    public init() {
        this._currLife = this.lifeValue;
        this.isDie = false;
        this.explode.active = false;
        this.bloodFace.setScale(1, 1, 1);
    }

    private _onTriggerEnter(event: ITriggerEvent) {
        const collisionGroup = event.otherCollider.getGroup();
        if (
            collisionGroup === Constant.CollisionType.ENEMY_PLANE ||
            collisionGroup === Constant.CollisionType.ENEMY_BULLET
        ) {
            if (this._currLife === this.lifeValue) {
                this.blood.active = true;
            }
            this._currLife--;
            this.bloodFace.setScale(this._currLife / this.lifeValue, 1, 1);
            if (this._currLife <= 0) {
                this.isDie = true;
                this._audioSource.play();
                this.explode.active = true;
                this.blood.active = false;
            }
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
