// tests go here; this will not be compiled when this package is used as an extension.
PTJoystickBIT.Initialization()
PTJoystickBIT.autoPowerOff(false)
basic.forever(function () {
    if (PTJoystickBIT.buttonStatus(Button_PIN.L1)) {
        serial.writeString("L1 ")
    } else {
        if (PTJoystickBIT.buttonStatus(Button_PIN.ZL)) {
            serial.writeString("ZL")
        } else {
            if (PTJoystickBIT.buttonStatus(Button_PIN.R1)) {
                serial.writeString("R1")
            } else {
                if (PTJoystickBIT.buttonStatus(Button_PIN.ZR)) {
                    serial.writeString("ZR")
                } else {
                    if (PTJoystickBIT.buttonStatus(Button_PIN.UP)) {
                        serial.writeString("UP")
                    } else {
                        if (PTJoystickBIT.buttonStatus(Button_PIN.DOWN)) {
                            serial.writeString("DOWN")
                        } else {
                            if (PTJoystickBIT.buttonStatus(Button_PIN.LEFT)) {
                                serial.writeString("LEFT")
                            } else {
                                if (PTJoystickBIT.buttonStatus(Button_PIN.RIGHT)) {
                                    serial.writeString("RIGHT")
                                } else {
                                    if (PTJoystickBIT.buttonStatus(Button_PIN.X)) {
                                        serial.writeString("X")
                                    } else {
                                        if (PTJoystickBIT.buttonStatus(Button_PIN.Y)) {
                                            serial.writeString("Y")
                                        } else {
                                            if (PTJoystickBIT.buttonStatus(Button_PIN.A)) {
                                                serial.writeString("A")
                                            } else {
                                                if (PTJoystickBIT.buttonStatus(Button_PIN.B)) {
                                                    serial.writeString("B")
                                                } else {
                                                    if (PTJoystickBIT.buttonStatus(Button_PIN.SEL)) {
                                                        serial.writeString("SEL-")
                                                    } else {
                                                        if (PTJoystickBIT.buttonStatus(Button_PIN.STA)) {
                                                            serial.writeString("STA+")
                                                        } else {
                                                            if (PTJoystickBIT.buttonStatus(Button_PIN.TUB)) {
                                                                serial.writeString("TUB")
                                                            } else {
                                                                if (PTJoystickBIT.buttonStatus(Button_PIN.VB)) {
                                                                    serial.writeString("VB")
                                                                } else {
                                                                    if (PTJoystickBIT.buttonStatus(Button_PIN.HOME)) {
                                                                        serial.writeString("HOME")
                                                                    } else {
                                                                        if (PTJoystickBIT.buttonStatus(Button_PIN.LEFT_HAT)) {
                                                                            serial.writeString("LEFT HAT")
                                                                        } else {
                                                                            if (PTJoystickBIT.buttonStatus(Button_PIN.RIGHT_HAT)) {
                                                                                serial.writeString("RIGHT HAT")
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
})
control.inBackground(function () {
    while (true) {
        serial.writeString("LeftX = ")
        serial.writeNumber(PTJoystickBIT.readAnalogHat(Analog_Hat.left, Axis.X))
        serial.writeString(" LeftY = ")
        serial.writeNumber(PTJoystickBIT.readAnalogHat(Analog_Hat.left, Axis.Y))
        serial.writeString(" RightX = ")
        serial.writeNumber(PTJoystickBIT.readAnalogHat(Analog_Hat.right, Axis.X))
        serial.writeString(" RightY = ")
        serial.writeNumber(PTJoystickBIT.readAnalogHat(Analog_Hat.right, Axis.Y))
        serial.writeLine("")
        basic.pause(50)
    }
})
