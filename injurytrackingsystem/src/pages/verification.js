import Verificaiton from '@/components/authentication/Verificaiton'
import { jost } from '@/utils/fonts'
import Head from 'next/head'
import React from 'react'

const verification = () => {
    return (
        <>
            <Head>
                <title>Verification |  Swasthya</title>
            </Head>
            <div className={jost.className}>
                <Verificaiton />
            </div>
        </>
    )
}

export default verification
