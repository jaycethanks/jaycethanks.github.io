// 表类，用于控制和管理表整体逻辑
class Clock {
    ctx: CanvasRenderingContext2D;
    /**
     * @param canvasId canvas id
     * @param circleColor 表盘外圈的颜色
     * @param circleWidth 表盘外圈的宽度
     * @param fontSize 表盘数字的字体大小
     * @param offset 表盘数字的偏移大小
     * @param outBorderColor 表盘外圈的边框颜色
     * @param innerColor 表盘内圈的填充颜色
     * @param centerColor 表盘中心点的颜色
     * @param bgImgSrc 背景图片的URL地址
     * @param hColor 时针的颜色
     * @param mColor 分针的颜色
     * @param sColor 秒针的颜色
     */
    constructor(
        canvasId: string,
        circleColor: string,
        circleWidth: number,
        fontSize: number,
        offset: number,
        outBorderColor: string,
        innerColor: string,
        centerColor: string,
        bgImgSrc: string,
        hColor: string,
        mColor: string,
        sColor: string,
        scaleTextType: "roma" | "arb" | "emoji"
    ) {
        const canvas = document.querySelector(`#${canvasId}`) as HTMLCanvasElement;
        this.ctx = canvas.getContext("2d");
        const radius = canvas.height / 2;
        // 表盘实例
        this.fetchBackgroundImage(bgImgSrc).then((img) => {
            const clockFace = new ClockFace(
                canvas,
                radius,
                circleColor,
                circleWidth,
                fontSize,
                offset,
                outBorderColor,
                innerColor,
                centerColor,
                img,
                scaleTextType
            );
            // 指针实例
            const hourHand = new ClockHand(canvas, 8, radius * 0.3, hColor);
            const minHand = new ClockHand(canvas, 6, radius * 0.6, mColor);
            const secHand = new ClockHand(canvas, 2, radius * 0.8, sColor);
            // this.updateRender(canvas, clockFace, hourHand, minHand, secHand)
            let _this = this;
            setInterval(() => {
                _this.updateRender(canvas, clockFace, hourHand, minHand, secHand);
                console.log("draw");
            }, 1000);
        });
    }
    private fetchBackgroundImage(imgSrc: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = imgSrc;
            img.onload = () => {
                resolve(img);
            };
        });
    }
    private updateRender(
        canvas: HTMLCanvasElement,
        clockFace: ClockFace,
        hourHand: ClockHand,
        minHand: ClockHand,
        secHand: ClockHand
    ) {
        // 清空画布
        this.clearCanvas();
        // 绘制表盘
        clockFace.draw();
        // 绘制表针
        const { hoursAngle, minutesAngle, secondsAngle } = this.getAngles();
        hourHand.draw(hoursAngle);
        minHand.draw(minutesAngle);
        secHand.draw(secondsAngle);
        // 绘制表中心点
        clockFace.drawCenterPoint();
    }
    private clearCanvas() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
    private getAngles() {
        const time = new Date();
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const hoursAngle = ((hours / 12) % 12) * Math.PI * 2;
        const minutesAngle = (minutes / 60) * Math.PI * 2;
        const secondsAngle = (seconds / 60) * Math.PI * 2;
        return { hoursAngle, minutesAngle, secondsAngle };
    }
}
// 表盘类， 负责绘制表盘，以及数字
class ClockFace {
    private ctx: CanvasRenderingContext2D;
    private radius: number;
    private center: { x: number; y: number };
    private circleColor: string;
    private circleMargin = 10; // 表盘距离画布的margin
    private circleWidth: number; // 表盘的宽度因该
    private centerSize = 4; //中心点的大小
    private centerColor: string; //中心点和字体的颜色
    private fontSize = 24;
    private offset = 24;
    private outBorderColor: string;
    private innerColor: string;
    private bgImgEl: HTMLImageElement;
    private scaleTextType: "roma" | "arb" | "emoji" = "arb";
    private NumberText = {
        roma: [
            "XII", // 12点
            "I", // 1点
            "II", // 2点
            "III", // 3点
            "IV", // 4点
            "V", // 5点
            "VI", // 6点
            "VII", // 7点
            "VIII", // 8点
            "IX", // 9点
            "X", // 10点
            "XI", // 11点
        ],
        arb: ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
        emoji: [
            "🌕", // 满月
            "🌖", // 剩下最后一小块的月亮
            "🌗", // 月牙形状的月亮
            "🌘", // 月亮的最后一小块
            "🌑", // 新月
            "🌚", // 新月脸
            "🌒", // 月亮的第一个月牙
            "🌓", // 月牙形状的月亮
            "🌔", // 月牙形状的月亮,剩下最后一小块
            "🌝", // 满月脸
            "🌖", // 剩下最后一小块的月亮
            "🌗", // 月牙形状的月亮
        ],
    };

    /**
     *
     * @param el 目标绘制元素
     * @param radius 表盘的大小
     * @param circleColor 表圈的颜色
     * @param circleWidth 表圈的宽度
     */
    constructor(
        el: HTMLCanvasElement,
        radius: number,
        circleColor: string,
        circleWidth: number,
        fontSize: number,
        offset: number,
        outBorderColor: string,
        innerColor: string,
        centerColor: string,
        bgImgEl: HTMLImageElement,
        scaleTextType: "roma" | "arb" | "emoji"
    ) {
        this.ctx = el.getContext("2d");
        this.center = {
            x: this.ctx.canvas.width / 2,
            y: this.ctx.canvas.height / 2,
        };
        this.radius = radius;
        this.circleColor = circleColor;
        this.circleWidth = circleWidth;
        this.outBorderColor = outBorderColor;
        this.innerColor = innerColor;
        this.fontSize = fontSize;
        this.offset = offset;
        this.centerColor = centerColor;
        this.bgImgEl = bgImgEl;
        this.scaleTextType = scaleTextType;
    }

    // 绘制入口函数
    public draw() {
        this.drawOuterCircle();
        this.drawInnerCircle();
        this.drawCenterPoint();
        this.drawImage();
        this.drawNumbers();
    }
    // 绘制表盘外圈
    private drawOuterCircle() {
        this.drawCircle(this.radius - this.circleMargin, this.outBorderColor);
        this.ctx.fillStyle = this.circleColor;
        this.ctx.fill();
    }
    // 绘制表盘内圈
    private drawInnerCircle() {
        this.drawCircle(
            this.radius - this.circleMargin - this.circleWidth,
            this.innerColor
        );
        this.ctx.fillStyle = "#fff";
        this.ctx.fill();
    }
    // 绘制表心点
    public drawCenterPoint() {
        this.drawCircle(this.centerSize, this.centerColor);
        this.ctx.fillStyle = this.centerColor;
        this.ctx.fill();
    }
    // 绘制圈
    private drawCircle(radius: number, borderColor: string) {
        const { x, y } = this.center;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.strokeStyle = borderColor;
        this.ctx.lineWidth = 8;
        this.ctx.stroke();
    }
    // 绘制背景
    public drawImage() {
        const { x, y } = this.center;
        const radius = this.radius - this.circleMargin - this.circleWidth;

        // 保存当前context状态
        this.ctx.save();

        // 创建一个剪裁区域
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.clip();

        // 在剪裁区域内绘制图片
        this.ctx.drawImage(
            this.bgImgEl,
            x - radius,
            y - radius,
            radius * 2,
            radius * 2
        );

        // 恢复之前保存的context状态
        this.ctx.restore();
    }

    // 绘制数字
    private drawNumbers() {
        const scaleTextList = this.NumberText[this.scaleTextType];
        const { x, y } = this.center;
        this.ctx.font = `bold ${this.fontSize}px serif`;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = this.centerColor;

        const DELTA = -(Math.PI * 2) / 12;
        for (let i = 0; i < 12; i++) {
            const theta = DELTA * i;
            const offset = this.offset;
            const _x = (this.radius - offset) * Math.sin(theta);
            const _y = (this.radius - offset) * Math.cos(theta);
            this.ctx.fillText(`${scaleTextList[i]}`, x - _x, y - _y);
        }
    }
}
// 指针类，负责绘制表盘指针
class ClockHand {
    private ctx: CanvasRenderingContext2D;
    private center: { x: number; y: number };

    /**
     * @param el
     * @param width 指针宽度
     * @param length 指针长度
     * @param color 指针颜色
     */
    constructor(
        el: HTMLCanvasElement,
        private width: number,
        private length: number,
        private color: string
    ) {
        this.ctx = el.getContext("2d");
        this.center = {
            x: this.ctx.canvas.width / 2,
            y: this.ctx.canvas.height / 2,
        };
    }

    /**
     *
     * @param angle 指针角度
     */
    public draw(angle: number) {
        const { x, y } = this.center;
        this.ctx.beginPath();
        this.ctx.lineWidth = this.width;
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = this.color;
        this.ctx.moveTo(x, y);
        // this.ctx.lineTo(length * Math.sin(angle), length * Math.cos(angle));
        this.ctx.lineTo(
            x + this.length * Math.sin(angle),
            y - this.length * Math.cos(angle)
        );
        this.ctx.stroke();
        // this.ctx.closePath()
    }
}

const canvasId = "pika1";
const circleColor = "#ff6c0a";
const circleWidth = 12;
const fontSize = 24;
const offset = 44;
const outBorderColor = "#ff8e42";
const innerColor = "#ffffff";
const centerColor = "#000000";
const bgImgSrc = "./pika1.jpg";
const hColor = "#000000";
const mColor = "#00cc5c";
const sColor = "#000000";

const clock = new Clock(
    canvasId,
    circleColor,
    circleWidth,
    fontSize,
    offset,
    outBorderColor,
    innerColor,
    centerColor,
    bgImgSrc,
    hColor,
    mColor,
    sColor,
    "arb"
);

const canvasId3 = "pika3";
const circleColor3 = "#a694ff";
const circleWidth3 = 3;
const fontSize3 = 24;
const offset3 = 40;
const outBorderColor3 = "#a694ff";
const innerColor3 = "#ffffff";
const centerColor3 = "#a31aff";
const bgImgSrc3 = "./pika3.png";
const hColor3 = "#a31aff";
const mColor3 = "#333333";
const sColor3 = "#00f521";

const clock3 = new Clock(
    canvasId3,
    circleColor3,
    circleWidth3,
    fontSize3,
    offset3,
    outBorderColor3,
    innerColor3,
    centerColor3,
    bgImgSrc3,
    hColor3,
    mColor3,
    sColor3,
    "roma"
);

const canvasId4 = "dora1";
const circleColor4 = "#000000";
const circleWidth4 = 10;
const fontSize4 = 40;
const offset4 = 40;
const outBorderColor4 = "#2ec0ff";
const innerColor4 = "#ffffff";
const centerColor4 = "#ff1414";
const bgImgSrc4 = "./dora1.jpg";
const hColor4 = "#ff4d4d";
const mColor4 = "#2ec0ff";
const sColor4 = "#ff1414";
const clock4 = new Clock(
    canvasId4,
    circleColor4,
    circleWidth4,
    fontSize4,
    offset4,
    outBorderColor4,
    innerColor4,
    centerColor4,
    bgImgSrc4,
    hColor4,
    mColor4,
    sColor4,
    "emoji"
);
