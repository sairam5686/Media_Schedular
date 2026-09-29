import React from 'react'
import { Badge } from "../Components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";

import { IoIosTrendingUp } from "react-icons/io";

const Appcard = () => {
  return (
   <Card className="@container/card w-75">
                        <CardHeader>
                          <CardDescription>Total Revenue</CardDescription>
                          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            $1,250.00
                          </CardTitle>
                          <CardAction>
                            <Badge variant="outline">
                              <IoIosTrendingUp />
                              +12.5%
                            </Badge>
                          </CardAction>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                          <div className="line-clamp-1 flex gap-2 font-medium">
                            Trending up this month
                             <IoIosTrendingUp className="size-4" />
                          </div>
                          <div className="text-muted-foreground">
                            Visitors for the last 6 months
                          </div>
                        </CardFooter>
                      </Card>
  )
}

export default Appcard