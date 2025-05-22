"use client";

import Link from 'next/link'

import styles from "./page.module.css"

export default function LoginPage() {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h3 className="styles_title">Login or Sign Up</h3>
                <a href="/login" className={styles.btn}>Login</a>
                <a href="/register" className={styles.btn}>Sign Up</a>
            </div>
        </div>
    );

}
// hi