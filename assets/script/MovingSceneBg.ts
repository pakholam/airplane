import {
    _decorator,
    Component,
    Node,
    // EventKeyboard,
    // EventTouch,
    // KeyCode,
    // Input
    // Touch,
    // Vec2,
} from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = MovingSceneBg
 * DateTime = Tue Jun 27 2023 17:51:07 GMT+0800 (中国标准时间)
 * Author = cerf_baleine
 * FileBasename = MovingSceneBg.ts
 * FileBasenameNoExtension = MovingSceneBg
 * URL = db://assets/script/MovingSceneBg.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
// const temp_vec2 = new Vec2();

@ccclass('MovingSceneBg')
export class MovingSceneBg extends Component {
    @property(Node)
    bg01: Node = null;

    @property(Node)
    bg02: Node = null;

    private _bgSpeed = 10;
    private _bgMovingRange = 90;

    // private _originTouchPos = new Vec2();

    start() {
        this._init();
        // this.bg01.on(Node.EventType.TOUCH_START, this._touchStart, this);
        // input.on(Input.EventType.KEY_DOWN, this._keydown, this);
    }

    test() {
        this._init();
    }

    // _touchStart(touch: Touch, event: EventTouch) {
    //     console.log('touch start');
    //     // 获取当前触点位置，getLocation依照屏幕左下角做的计算
    //     touch.getLocation(temp_vec2);
    //     // 适配设备分配率，getUILocation依照canvas尺寸左下角做触点计算
    //     touch.getUILocation(temp_vec2);

    //     // 避免直接使用等号赋值,若有其他地方给temp_vec2赋值，_originTouchPos也会改变
    //     this._originTouchPos.set(temp_vec2);
    //     // this._originTouchPos = temp_vec2;
    // }

    // _keydown(event: EventKeyboard) {
    //     if (event.keyCode === KeyCode.KEY_A) {
    //         console.log('keydown');
    //     }
    // }

    update(deltaTime: number) {
        this._moveBackground(deltaTime);
    }

    private _init() {
        this.bg01.setPosition(0, 0, 0);
        this.bg02.setPosition(0, 0, -this._bgMovingRange);
    }

    private _moveBackground(deltaTime: number) {
        this.bg01.setPosition(0, 0, this.bg01.position.z + this._bgSpeed * deltaTime);
        this.bg02.setPosition(0, 0, this.bg02.position.z + this._bgSpeed * deltaTime);

        if (this.bg01.position.z > this._bgMovingRange) {
            this.bg01.setPosition(0, 0, this.bg02.position.z - this._bgMovingRange);
        } else if (this.bg02.position.z > this._bgMovingRange) {
            this.bg02.setPosition(0, 0, this.bg01.position.z - this._bgMovingRange);
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
