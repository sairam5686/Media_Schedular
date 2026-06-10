import Navbar from '@/Components/Navbar'
import SocialCard from '@/Components/SocialCard'
import { Button } from '@/components/ui/button'
import { CiLinkedin } from "react-icons/ci";

import React from 'react'

const SocialConnection = () => {
    return (
        <div className='h-screen bg-gray-100'>
            <Navbar Title="Social Connection" Para="View and add your social media connection" />
            <div className='px-4 py-5'>
                <div className='flex flex-row justify-end'>
                    <Button size={"lg"}>Connect Here</Button>
                </div>

                <div className='flex flex-row flex-wrap gap-4'>
                    <SocialCard
                        icon={<CiLinkedin className="h-6 w-6 text-blue-600" />}
                        name="Avinash Kumar"
                        platform="LinkedIn"
                    />

                    <SocialCard
                        icon={<CiLinkedin className="h-6 w-6 text-red-600" />}
                        name="Avinash Kumar"
                        platform="LinkedIn"
                    />

                </div>
            </div>
        </div>
    )
}

export default SocialConnection