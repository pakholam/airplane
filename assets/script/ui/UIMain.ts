import { _decorator, Component, Touch, EventTouch, Node, Input } from 'cc';
import { GameManager } from '../framework/GameManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = UiMain
 * DateTime = Thu Jun 29 2023 11:28:47 GMT+0800 (中国标准时间)
 * Author = cerf_baleine
 * FileBasename = uiMain.ts
 * FileBasenameNoExtension = uiMain
 * URL = db://assets/script/ui/uiMain.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('UIMain')
export class UIMain extends Component {
    @property
    public planeSpeed = 1;

    @property(Node)
    public playerPlane: Node = null;

    @property(GameManager)
    public gameManager: GameManager = null;

    @property(Node)
    public gameStart: Node = null;

    @property(Node)
    public game: Node = null;

    @property(Node)
    public gameOver: Node = null;

    start() {
        this.node.on(Input.EventType.TOUCH_START, this._touchStart, this);
        this.node.on(Input.EventType.TOUCH_MOVE, this._touchMove, this);
        this.node.on(Input.EventType.TOUCH_END, this._touchEnd, this);

        this.gameStart.active = true;
    }

    public reStart() {
        this.gameOver.active = false;
        this.game.active = true;
        this.gameManager.playAudioEffect('button');
        this.gameManager.gameReStart();
    }

    public returnMain() {
        this.gameOver.active = false;
        this.gameStart.active = true;
        this.gameManager.playAudioEffect('button');
        this.gameManager.returnMain();
    }

    _touchStart(touch: Touch, event: EventTouch) {
        if (this.gameManager.isGameStart) {
            this.gameManager.isShooting(true);
        } else {
            this.gameStart.active = false;
            this.game.active = true;
            this.gameManager.playAudioEffect('button');
            this.gameManager.gameStart();
        }
    }

    _touchMove(touch: Touch, event: EventTouch) {
        if (!this.gameManager.isGameStart) {
            return;
        }
        const delta = touch.getDelta();
        let pos = this.playerPlane.position;
        this.playerPlane.setPosition(
            pos.x + 0.01 * this.planeSpeed * delta.x,
            pos.y,
            pos.z - 0.01 * this.planeSpeed * delta.y
        );
    }

    _touchEnd(touch: Touch, event: EventTouch) {
        if (!this.gameManager.isGameStart) {
            return;
        }
        this.gameManager.isShooting(false);
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
