import React, { useEffect } from 'react';
import * as jQuery from 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap';
import styles from './TicTacToe.module.scss';
import {TicTacToePlugin } from './TicTacToePlugin';
import 'bootstrap/dist/css/bootstrap.min.css';


const TicTacToe = (props) => {
    useEffect(() => {
        TicTacToePlugin(jQuery);
    }, [])

    return (
        <>
            <div className={styles.app}>
                <div className={`container-fluid ${styles.app_container}`}>
                    <div className={`row ${styles.app_row}`}>
                        <div className={`col-xs-4 ${styles.play_box}`} id="0">
                            <div className={styles.symbol}></div>
                        </div>
                        <div className={`col-xs-4 ${styles.play_box}`} id="1">
                            <div className={styles.symbol}></div>
                        </div>
                        <div className={`col-xs-4 ${styles.play_box} ${styles.last_right}`} id="2">
                            <div className={styles.symbol}></div>
                        </div>
                        <div className={`col-xs-4 ${styles.play_box}`} id="3">
                            <div className={styles.symbol}></div>
                        </div>
                        <div className={`col-xs-4 ${styles.play_box}`} id="4">
                            <div className={styles.symbol}></div>
                        </div>
                        <div className={`col-xs-4 ${styles.play_box} ${styles.last_right}`} id="5">
                            <div className={styles.symbol}></div>
                        </div>
                        <div className={`col-xs-4 ${styles.play_box} ${styles.last_bottom}`} id="6">
                            <div className={styles.symbol}></div>
                        </div>
                        <div className={`col-xs-4 ${styles.play_box} ${styles.last_bottom}`} id="7">
                            <div className={styles.symbol}></div>
                        </div>
                        <div className={`col-xs-4 ${styles.play_box} ${styles.last_right} ${styles.last_bottom}`} id="8">
                            <div className={styles.symbol}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`modal fade app-modal`} tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
                <div className="modal-dialog modal-size">
                    <div className={`modal-content ${styles.modal_content}`}>
                        <h3 className={`${styles.content} heading`}>Warning!!!</h3>
                        <hr className={styles.warning_hr} />
                        <div className={`${styles.content} ${styles.body}`}>
                            Please save your time and don't even think you're smart. <br /><strong><em>I'M SMARTER THAN YOU! HA-HA-HA!!!</em></strong> <br />
                            Wana try me? Chose : <br />
                            <div className={`center-block ${styles.symbol_options}`}>
                                <button className={`${styles.symbol_option} btn btn-default btn-md`} data-dismiss="modal">X</button> OR <button className={`${styles.symbol_option} btn btn-default btn-md`} data-dismiss="modal">O</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TicTacToe;