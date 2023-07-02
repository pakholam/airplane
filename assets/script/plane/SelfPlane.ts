import { _decorator, Component, EventTouch, Node, Touch } from 'cc';
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
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start() {}

    // update (deltaTime: number) {
    //     // [4]
    // }
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
