/**
 * Functions are mapped to blocks using various macros
 * in comments starting with %. The most important macro
 * is "block", and it specifies that a block should be
 * generated for an **exported** function.
 */

let VB_Button = 0
let LEFT_Button = 0
let DOWN_Button = 0
let UP_Button = 0
let HOME_Button = 0
let Serial_String: string[] = []
let Auto_Power_Off = true
let State_Button_L1 = false
let State_Button_ZL = false
let State_Button_R1 = false
let State_Button_ZR = false
let State_Button_UP = false
let State_Button_DOWN = false
let State_Button_LEFT = false
let State_Button_RIGHT = false
let State_Button_X = false
let State_Button_Y = false
let State_Button_A = false
let State_Button_B = false
let State_Button_SEL = false
let State_Button_STA = false
let State_Button_TUB = false
let State_Button_VB = false
let State_Button_HOME = false
let State_Button_LEFT_HAT = false
let State_Button_RIGHT_HAT = false

enum ADC_Read {
    //% block="0"
    ADC0 = 0x84,
    //% block="1"
    ADC1 = 0xC4,
    //% block="2"
    ADC2 = 0x94,
    //% block="3"
    ADC3 = 0xD4,
    //% block="4"
    ADC4 = 0xA4,
    //% block="5"
    ADC5 = 0xE4,
    //% block="6"
    ADC6 = 0xB4,
    //% block="7"
    ADC7 = 0xF4
}

enum Button_PIN {
    //% block="L1"
    L1,
    //% block="ZL"
    ZL,
    //% block="R1"
    R1,
    //% block="ZR"
    ZR,
    //% block="UP"
    UP,
    //% block="DOWN"
    DOWN,
    //% block="LEFT"
    LEFT,
    //% block="RIGHT"
    RIGHT,
    //% block="X"
    X,
    //% block="Y"
    Y,
    //% block="A"
    A,
    //% block="B"
    B,
    //% block="SEL-"
    SEL,
    //% block="STA+"
    STA,
    //% block="TUB"
    TUB,
    //% block="VB"
    VB,
    //% block="HOME"
    HOME,
    //% block="LEFT HAT"
    LEFT_HAT,
    //% block="RIGHT HAT"
    RIGHT_HAT
}

enum Button_Type {
    //% block="clicked"
    clicked,
    //% block="released"
    released
}

enum Analog_Hat {
    //% block="LEFT"
    left,
    //% block="RIGHT"
    right
}

enum Axis {
    //% block="X"
    X,
    //% block="Y"
    Y
}

//% color="#2ECC89" icon="\uf11b"
namespace PTJoystickBIT {
    /**
     * Read Analog from ADC Channel
     */
    //% block="ADCRead %ADC_Read"
    function ADCRead(ADCRead: ADC_Read): number { 
        pins.i2cWriteNumber(0x48, ADCRead, NumberFormat.UInt8LE, false)
        return ADCRead = pins.i2cReadNumber(0x48, NumberFormat.UInt16BE, false)      
    }
    
    //% group="Setup Joystick"
    /**
      * Enable or Disable auto power off (default is enable)
    */
    //% block="auto power off %flag"
    //% flag.shadow="toggleOnOff"
    export function autoPowerOff(flag: boolean): void {
        Auto_Power_Off = flag
    }

    //% group="Setup Joystick"
    /**
     * Initialization joystick
     */
    //% block="initialization joystick"
    export function Initialization():void {
        for (let index = 0; index < 2; index++) {
            pins.analogWritePin(AnalogPin.P16, 1023)
            basic.pause(50)
            pins.analogWritePin(AnalogPin.P16, 0)
            basic.pause(100)
        }
        serial.redirect(SerialPin.USB_TX, SerialPin.P14, BaudRate.BaudRate115200)
        pins.setPull(DigitalPin.P9, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P5, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P7, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P0, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P10, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P11, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P12, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P6, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P4, PinPullMode.PullUp)
        radio.setTransmitPower(7)

        control.runInParallel(() => {
            while (true) {
                Serial_String = serial.readLine().split(",")
                if (parseFloat(Serial_String[4]) >= 0) {
                    HOME_Button = parseFloat(Serial_String[0])
                    UP_Button = parseFloat(Serial_String[1])
                    DOWN_Button = parseFloat(Serial_String[2])
                    LEFT_Button = parseFloat(Serial_String[3])
                    VB_Button = parseFloat(Serial_String[4])
                }

                if (Auto_Power_Off == true) {
                    pins.digitalWritePin(DigitalPin.P3, 1)
                }
                else {
                    pins.digitalWritePin(DigitalPin.P3, 0)
                }

                if (pins.digitalReadPin(DigitalPin.P9) == 0 || pins.digitalReadPin(DigitalPin.P5) == 0 || pins.digitalReadPin(DigitalPin.P7) == 0 || pins.digitalReadPin(DigitalPin.P0) == 0 || UP_Button == 0 || DOWN_Button == 0 || LEFT_Button == 0 || pins.digitalReadPin(DigitalPin.P10) == 0 || pins.digitalReadPin(DigitalPin.P11) == 0 || pins.digitalReadPin(DigitalPin.P13) == 0 || pins.digitalReadPin(DigitalPin.P12) == 0 || pins.digitalReadPin(DigitalPin.P2) == 0 || pins.digitalReadPin(DigitalPin.P1) == 0 || pins.digitalReadPin(DigitalPin.P8) == 0 || pins.digitalReadPin(DigitalPin.P15) == 0 || VB_Button == 0 || HOME_Button == 0 || pins.digitalReadPin(DigitalPin.P6) == 0 || pins.digitalReadPin(DigitalPin.P4) == 0) {
                    pins.digitalWritePin(DigitalPin.P3, 0)
                }
                else {
                    pins.digitalWritePin(DigitalPin.P3, 1)
                }
            }
        })
    }

    //% group="Button Event"
    /**
     * Read analog value from jostick
     */
    //% block="analog value of %Analog_Hat|axis %Axis"
    export function readAnalogHat(analog_channel: Analog_Hat, axis: Axis): number {
        if (analog_channel == Analog_Hat.left) {
            if (axis == Axis.X) {
                return ADCRead(ADC_Read.ADC6)
            }
            else if (axis == Axis.Y) {
                return ADCRead(ADC_Read.ADC7)
            }
            else {
                return 0
            }
        }
        else if (analog_channel == Analog_Hat.right) {
            if (axis == Axis.X) {
                return ADCRead(ADC_Read.ADC1)
            }
            else if (axis == Axis.Y) {
                return ADCRead(ADC_Read.ADC0)
            }
            else {
                return 0
            }
        }
        else {
            return 0
        }
    }

    //% group="Button Event"
    /**
     * Read button value from jostick
     */
    //% block="button value of %Button_PIN"
    export function readButton(button: Button_PIN): number {
        if (button == Button_PIN.L1) {
            return pins.digitalReadPin(DigitalPin.P9)
        }
        else if (button == Button_PIN.ZL) {
            return pins.digitalReadPin(DigitalPin.P5)
        }
        else if (button == Button_PIN.R1) {
            return pins.digitalReadPin(DigitalPin.P7)
        }
        else if (button == Button_PIN.ZR) {
            return pins.digitalReadPin(DigitalPin.P0)
        }
        else if (button == Button_PIN.UP) {
            return UP_Button
        }
        else if (button == Button_PIN.DOWN) {
            return DOWN_Button
        }
        else if (button == Button_PIN.LEFT) {
            return LEFT_Button
        }
        else if (button == Button_PIN.RIGHT) {
            return pins.digitalReadPin(DigitalPin.P10)
        }
        else if (button == Button_PIN.X) {
            return pins.digitalReadPin(DigitalPin.P11)
        }
        else if (button == Button_PIN.Y) {
            return pins.digitalReadPin(DigitalPin.P13)
        }
        else if (button == Button_PIN.A) {
            return pins.digitalReadPin(DigitalPin.P12)
        }
        else if (button == Button_PIN.B) {
            return pins.digitalReadPin(DigitalPin.P2)
        }
        else if (button == Button_PIN.SEL) {
            return pins.digitalReadPin(DigitalPin.P1)
        }
        else if (button == Button_PIN.STA) {
            return pins.digitalReadPin(DigitalPin.P8)
        }
        else if (button == Button_PIN.TUB) {
            return pins.digitalReadPin(DigitalPin.P15)
        }
        else if (button == Button_PIN.VB) {
            return VB_Button
        }
        else if (button == Button_PIN.HOME) {
            return HOME_Button
        }
        else if (button == Button_PIN.LEFT_HAT) {
            return pins.digitalReadPin(DigitalPin.P6)
        }
        else if (button == Button_PIN.RIGHT_HAT) {
            return pins.digitalReadPin(DigitalPin.P4)
        }
        else {
            return 0
        }
    }

    //% group="Button Event"
    /**
    * Get button status
    */
    //% block="button %button is pressed"
    export function buttonStatus(button: Button_PIN): boolean {
        if (button == Button_PIN.L1) {
            return (pins.digitalReadPin(DigitalPin.P9) == 0 ? true : false)
        }
        else if (button == Button_PIN.ZL) {
            return (pins.digitalReadPin(DigitalPin.P5) == 0 ? true : false)
        }
        else if (button == Button_PIN.R1) {
            return (pins.digitalReadPin(DigitalPin.P7) == 0 ? true : false)
        }
        else if (button == Button_PIN.ZR) {
            return (pins.digitalReadPin(DigitalPin.P0) == 0 ? true : false)
        }
        else if (button == Button_PIN.UP) {
            return (UP_Button == 0 ? true : false)
        }
        else if (button == Button_PIN.DOWN) {
            return (DOWN_Button == 0 ? true : false)
        }
        else if (button == Button_PIN.LEFT) {
            return (LEFT_Button == 0 ? true : false)
        }
        else if (button == Button_PIN.RIGHT) {
            return (pins.digitalReadPin(DigitalPin.P10) == 0 ? true : false)
        }
        else if (button == Button_PIN.X) {
            return (pins.digitalReadPin(DigitalPin.P11) == 0 ? true : false)
        }
        else if (button == Button_PIN.Y) {
            return (pins.digitalReadPin(DigitalPin.P13) == 0 ? true : false)
        }
        else if (button == Button_PIN.A) {
            return (pins.digitalReadPin(DigitalPin.P12) == 0 ? true : false)
        }
        else if (button == Button_PIN.B) {
            return (pins.digitalReadPin(DigitalPin.P2) == 0 ? true : false)
        }
        else if (button == Button_PIN.SEL) {
            return (pins.digitalReadPin(DigitalPin.P1) == 0 ? true : false)
        }
        else if (button == Button_PIN.STA) {
            return (pins.digitalReadPin(DigitalPin.P8) == 0 ? true : false)
        }
        else if (button == Button_PIN.TUB) {
            return (pins.digitalReadPin(DigitalPin.P15) == 0 ? true : false)
        }
        else if (button == Button_PIN.VB) {
            return (VB_Button == 0 ? true : false)
        }
        else if (button == Button_PIN.HOME) {
            return (HOME_Button == 0 ? true : false)
        }
        else if (button == Button_PIN.LEFT_HAT) {
            return (pins.digitalReadPin(DigitalPin.P6) == 0 ? true : false)
        }
        else if (button == Button_PIN.RIGHT_HAT) {
            return (pins.digitalReadPin(DigitalPin.P4) == 0 ? true : false)
        }
        else {
            return false
        }
    }

    //% group="Button Event"
    /**
    * Get button value is clicked or released
    */
    //% block="button %button is %event"
    export function buttonClicked(button: Button_PIN, event: Button_Type): boolean {
        if (button == Button_PIN.L1) {
            if (pins.digitalReadPin(DigitalPin.P9) == 0 && State_Button_L1 == false) {
                State_Button_L1 = true
                return (event == Button_Type.clicked ? true : false)
            }
            else if (pins.digitalReadPin(DigitalPin.P9) == 1 && State_Button_L1 == true) {
                State_Button_L1 = false
                return (event == Button_Type.clicked ? false : true)
            }
            else {
                return false
            }
        }
        else if (button == Button_PIN.ZL) {
            if (pins.digitalReadPin(DigitalPin.P5) == 0 && State_Button_ZL == false) {
                State_Button_ZL = true
                return (event == Button_Type.clicked ? true : false)
            }
            else if (pins.digitalReadPin(DigitalPin.P5) == 1 && State_Button_ZL == true) {
                State_Button_ZL = false
                return (event == Button_Type.clicked ? false : true)
            }
            else {
                return false
            }
        }
        else if (button == Button_PIN.R1) {
            if (pins.digitalReadPin(DigitalPin.P7) == 0 && State_Button_R1 == false) {
                State_Button_R1 = true
                return (event == Button_Type.clicked ? true : false)
            }
            else if (pins.digitalReadPin(DigitalPin.P7) == 1 && State_Button_R1 == true) {
                State_Button_R1 = false
                return (event == Button_Type.clicked ? false : true)
            }
            else {
                return false
            }
        }
        else if (button == Button_PIN.ZR) {
            if (pins.digitalReadPin(DigitalPin.P0) == 0 && State_Button_ZR == false) {
                State_Button_ZR = true
                return (event == Button_Type.clicked ? true : false)
            }
            else if (pins.digitalReadPin(DigitalPin.P0) == 1 && State_Button_ZR == true) {
                State_Button_ZR = false
                return (event == Button_Type.clicked ? false : true)
            }
            else {
                return false
            }
        }
        else if (button == Button_PIN.UP) {
            if (UP_Button == 0 && State_Button_UP == false) {
                State_Button_UP = true
                return (event == Button_Type.clicked ? true : false)
            }
            else if (UP_Button == 1 && State_Button_UP == true) {
                State_Button_UP = false
                return (event == Button_Type.clicked ? false : true)
            }
            else {
                return false
            }
        }
        else if (button == Button_PIN.DOWN) {
            if (DOWN_Button == 0 && State_Button_DOWN == false) {
                State_Button_DOWN = true
                return (event == Button_Type.clicked ? true : false)
            }
            else if (DOWN_Button == 1 && State_Button_DOWN == true) {
                State_Button_DOWN = false
                return (event == Button_Type.clicked ? false : true)
            }
            else {
                return false
            }
        }
        else if (button == Button_PIN.LEFT) {
            if (LEFT_Button == 0 && State_Button_LEFT == false) {
                State_Button_LEFT = true
                return (event == Button_Type.clicked ? true : false)
            }
            else if (LEFT_Button == 1 && State_Button_LEFT == true) {
                State_Button_LEFT = false
                return (event == Button_Type.clicked ? false : true)
            }
            else {
                return false
            }
        }
        else if (button == Button_PIN.RIGHT) {
            if (pins.digitalReadPin(DigitalPin.P10) == 0 && State_Button_RIGHT == false) {
                State_Button_RIGHT = true
                return (event == Button_Type.clicked ? true : false)
            }
            else if (pins.digitalReadPin(DigitalPin.P10) == 1 && State_Button_RIGHT == true) {
                State_Button_RIGHT = false
                return (event == Button_Type.clicked ? false : true)
            }
            else {
                return false
            }
        }
        else if (button == Button_PIN.X) {
            if (pins.digitalReadPin(DigitalPin.P11) == 0 && State_Button_X == false) {
                State_Button_X = true
                return (event == Button_Type.clicked ? true : false)
            }
            else if (pins.digitalReadPin(DigitalPin.P11) == 1 && State_Button_X == true) {
                State_Button_X = false
                return (event == Button_Type.clicked ? false : true)
            }
            else {
                return false
            }
        }
        else if (button == Button_PIN.Y) {
            if (pins.digitalReadPin(DigitalPin.P13) == 0 && State_Button_Y == false) {
                State_Button_Y = true
                return (event == Button_Type.clicked ? true : false)
            }
            else if (pins.digitalReadPin(DigitalPin.P13) == 1 && State_Button_Y == true) {
                State_Button_Y = false
                return (event == Button_Type.clicked ? false : true)
            }
            else {
                return false
            }
        }
        else if (button == Button_PIN.A) {
            if (pins.digitalReadPin(DigitalPin.P12) == 0 && State_Button_A == false) {
                State_Button_A = true
                return (event == Button_Type.clicked ? true : false)
            }
            else if (pins.digitalReadPin(DigitalPin.P12) == 1 && State_Button_A == true) {
                State_Button_A = false
                return (event == Button_Type.clicked ? false : true)
            }
            else {
                return false
            }
        }
        else if (button == Button_PIN.B) {
            if (pins.digitalReadPin(DigitalPin.P2) == 0 && State_Button_B == false) {
                State_Button_B = true
                return (event == Button_Type.clicked ? true : false)
            }
            else if (pins.digitalReadPin(DigitalPin.P2) == 1 && State_Button_B == true) {
                State_Button_B = false
                return (event == Button_Type.clicked ? false : true)
            }
            else {
                return false
            }
        }
        else if (button == Button_PIN.SEL) {
            if (pins.digitalReadPin(DigitalPin.P1) == 0 && State_Button_SEL == false) {
                State_Button_SEL = true
                return (event == Button_Type.clicked ? true : false)
            }
            else if (pins.digitalReadPin(DigitalPin.P1) == 1 && State_Button_SEL == true) {
                State_Button_SEL = false
                return (event == Button_Type.clicked ? false : true)
            }
            else {
                return false
            }
        }
        else if (button == Button_PIN.STA) {
            if (pins.digitalReadPin(DigitalPin.P8) == 0 && State_Button_STA == false) {
                State_Button_STA = true
                return (event == Button_Type.clicked ? true : false)
            }
            else if (pins.digitalReadPin(DigitalPin.P8) == 1 && State_Button_STA == true) {
                State_Button_STA = false
                return (event == Button_Type.clicked ? false : true)
            }
            else {
                return false
            }
        }
        else if (button == Button_PIN.TUB) {
            if (pins.digitalReadPin(DigitalPin.P15) == 0 && State_Button_TUB == false) {
                State_Button_TUB = true
                return (event == Button_Type.clicked ? true : false)
            }
            else if (pins.digitalReadPin(DigitalPin.P15) == 1 && State_Button_TUB == true) {
                State_Button_TUB = false
                return (event == Button_Type.clicked ? false : true)
            }
            else {
                return false
            }
        }
        else if (button == Button_PIN.VB) {
            if (VB_Button == 0 && State_Button_VB == false) {
                State_Button_VB = true
                return (event == Button_Type.clicked ? true : false)
            }
            else if (VB_Button == 1 && State_Button_VB == true) {
                State_Button_VB = false
                return (event == Button_Type.clicked ? false : true)
            }
            else {
                return false
            }
        }
        else if (button == Button_PIN.HOME) {
            if (HOME_Button == 0 && State_Button_HOME == false) {
                State_Button_HOME = true
                return (event == Button_Type.clicked ? true : false)
            }
            else if (HOME_Button == 1 && State_Button_HOME == true) {
                State_Button_HOME = false
                return (event == Button_Type.clicked ? false : true)
            }
            else {
                return false
            }
        }
        else if (button == Button_PIN.LEFT_HAT) {
            if (pins.digitalReadPin(DigitalPin.P6) == 0 && State_Button_LEFT_HAT == false) {
                State_Button_LEFT_HAT = true
                return (event == Button_Type.clicked ? true : false)
            }
            else if (pins.digitalReadPin(DigitalPin.P6) == 1 && State_Button_LEFT_HAT == true) {
                State_Button_LEFT_HAT = false
                return (event == Button_Type.clicked ? false : true)
            }
            else {
                return false
            }
        }
        else if (button == Button_PIN.RIGHT_HAT) {
            if (pins.digitalReadPin(DigitalPin.P4) == 0 && State_Button_RIGHT_HAT == false) {
                State_Button_RIGHT_HAT = true
                return (event == Button_Type.clicked ? true : false)
            }
            else if (pins.digitalReadPin(DigitalPin.P4) == 1 && State_Button_RIGHT_HAT == true) {
                State_Button_RIGHT_HAT = false
                return (event == Button_Type.clicked ? false : true)
            }
            else {
                return false
            }
        }
        else {
            return false
        }
    }

    //% group="Motion Sensor"
    /**
    * Get shake gesture value
    */
    //% block="on gesture shake"
    export function shakeGesture(): boolean {
        return (input.isGesture(Gesture.Shake) ? true : false)
    }

    //% group="Motion Sensor"
    /**
     * Read acceleration value from jostick
     */
    //% block="acceleration of axis %Axis"
    export function readAcceleration(axis: Axis): number {
        if (axis == Axis.X) {
            return -input.acceleration(Dimension.Y)
        }
        else if (axis == Axis.Y) {
            return -input.acceleration(Dimension.X)
        }
        else {
            return 0
        }
    }

    //% group="Vibration Control"
    /**
     * Stop Vibration
     */
    //% block="stop vibration"
    export function stopVibration():void {
        pins.analogWritePin(AnalogPin.P16, 0)
    }

    //% group="Vibration Control"
    /**
     * Control vibration motor. The vibration level is adjustable between 0 to 100.
     */
    //% block="vibration level %_vibration_level"
    //% vibration_level.min=0 vibration_level.max=10 vibration_level.defl=5
    export function vibrationMotor(vibration_level: number): void {
        pins.analogWritePin(AnalogPin.P16, pins.map(vibration_level, 0, 10, 0, 1023))
    }
    
    //% group="Vibration Control"
    /**
     * Control vibration motor. The vibration level is adjustable between 1 to 10 and adjustable time.
     */
    //% block="vibration level %vibration_level|time %time"
    //% vibration_level.min=1 vibration_level.max=10 vibration_level.defl=5
    //% time.shadow="timePicker" time.defl=100
    export function vibrationMotorTime(vibration_level: number, time: number): void {
        pins.analogWritePin(AnalogPin.P16, pins.map(vibration_level, 0, 10, 0, 1023))
        basic.pause(time)
        pins.analogWritePin(AnalogPin.P16, 0)
    }
}