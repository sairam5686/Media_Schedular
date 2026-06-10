import Appcard from '@/Components/Appcard';
import Navbar from '@/Components/Navbar'
import React from 'react'
import { IoIosTrendingUp } from "react-icons/io";
import { Separator } from "@/components/ui/separator"
import { Button } from '@/components/ui/button';



const Dashboard = () => {
    return (
        <div className='h-screen bg-gray-100'>
            <Navbar Title="Dashboard" Para="View your Social Analytics Here " />

            <div className='px-4 py-5'>

                <div className='flex flex-row justify-evenly'>
                    <Appcard />
                    <Appcard />
                    <Appcard />
                    <Appcard />
                </div>

               <section className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">

  {/* Yet to be Posted */}
  <div className="rounded-xl border bg-card p-5 shadow-sm">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-xl font-semibold">Yet to be Posted</h2>
      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
        3 Jobs
      </span>
    </div>

    <div className="space-y-4">

      <div className="rounded-lg border p-4 hover:bg-muted/50 transition-all">
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="font-medium">
              Frontend Developer Internship
            </h3>
            <p className="text-sm text-muted-foreground">
              React.js, TypeScript, Tailwind CSS
            </p>
          </div>

          <div className="flex justify-end">
            <Button>Post Job</Button>
          </div>
        </div>
      </div>

      <div className="rounded-lg border p-4 hover:bg-muted/50 transition-all">
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="font-medium">
              Backend Developer Internship
            </h3>
            <p className="text-sm text-muted-foreground">
              Node.js, Express.js, MongoDB
            </p>
          </div>

          <div className="flex justify-end">
            <Button>Post Job</Button>
          </div>
        </div>
      </div>

      

    </div>
  </div>

  {/* Posted */}
  <div className="rounded-xl border bg-card p-5 shadow-sm">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-xl font-semibold">Posted</h2>
      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
        2 Jobs
      </span>
    </div>

    <div className="space-y-4">

      <div className="rounded-lg border p-4 hover:bg-muted/50 transition-all">
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="font-medium">
              Full Stack Developer
            </h3>
            <p className="text-sm text-muted-foreground">
              Node.js, React.js, PostgreSQL
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">View</Button>
            <Button variant="destructive">Delete</Button>
          </div>
        </div>
      </div>

      <div className="rounded-lg border p-4 hover:bg-muted/50 transition-all">
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="font-medium">
              UI/UX Designer
            </h3>
            <p className="text-sm text-muted-foreground">
              Figma, Adobe XD Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, velit?
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">View</Button>
            <Button variant="destructive">Delete</Button>
          </div>
        </div>
      </div>

    </div>
  </div>

</section>


            </div>

        </div>
    )
}

export default Dashboard