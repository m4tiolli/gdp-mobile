import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../Card'
import { TabsContent } from '../Tabs'

interface ISection {
  value: string
  title: string,
  description: string,
  children: React.ReactNode
}

const Section = ({ value, title, description, children }: ISection) => {
  return (
    <TabsContent value={value}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className='gap-4'>
          {children}
        </CardContent>
      </Card>
    </TabsContent>
  )
}

export default Section