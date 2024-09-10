import { Card, CardContent, Typography } from "ui"

interface AuthFormProps {
  title: string
  description: string
  children: React.ReactNode
}

export default function AuthForm({ title, description, children }: AuthFormProps) {
  return (
    <div>
      <div className="text-center">
        <Typography variant="h1">{title}</Typography>
        <Typography variant="lead">{description}</Typography>
      </div>

      <Card className="mt-6">
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  )
}
