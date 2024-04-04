import React, {useState} from "react";
import { StyleSheet, View, TouchableOpacity, Modal, Text, Image } from "react-native";

const ModalPop = ({body, handleClick}) =>{
    const [open, setOpen] = useState();

    return(
        <Modal
            animationType="fade"
            transparent
            visible={open}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(1,1,1,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                    height: '25%', 
                    width: '80%', 
                    backgroundColor: '#D9D9D9',
                    borderRadius: 20,
                    alignItems: 'center',
                }}
                >
                    <View
                        style={{
                            height: 45,
                            width: '100%',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            flexDirection: 'row',
                            paddingHorizontal: 20,
                        }}
                    > 
                    </View>

                    <View
                        style={{
                            height: '80%',
                            paddingHorizontal: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 20,
                            width: '100%',
                        }}>

                        <Text style={style.body}>{body}</Text>

                        <View style={style.btnContainer}>
                            <TouchableOpacity 
                            onPress={() => setOpen(false)}
                            style={style.btn}>
                                <Text style={{
                                    color: '#8BC047',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    fontFamily: 'Jura_400Regular',
                                    textAlign: 'center',
                                    padding: 10,
                                }}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={style.btn1}>
                                <Text style={{
                                    color: '#FF0000',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    fontFamily: 'Jura_400Regular',
                                    textAlign: 'center',
                                    padding: 10,
                                }}>Confirm</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        </Modal>
    )
}

const style = StyleSheet.create({
    body: {
        fontSize: 20,
        color: '#3C5252',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Jura_400Regular',
        padding: 10,
    },
    btnContainer: {
        alignItems: 'center',
        width: '100%',
        paddingBottom: 50,
    },
    btn: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
    btn1: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
});

export default ModalPop;