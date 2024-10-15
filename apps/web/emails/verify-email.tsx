import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

export default function VerifyEmail({ token, email }: { token: string; email: string }) {
  return (
    <Html>
      <Head />
      <Preview>Your Next-Forum Verification Code</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8 text-center text-[24px] font-bold">Next Forum</Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              Please confirm your email address
            </Heading>
            <Text className="mx-auto text-sm leading-6">
              Click link below to verify your email:
            </Text>
            <Section className="my-8">
              <Link
                href={`${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?code=${token}&email=${email}`}
                className="align-center flex w-[100%] justify-center rounded-sm bg-[tomato] py-2 text-center font-medium text-white"
              >
                GET STARTED
              </Link>
            </Section>
            <Text className="text-sm leading-6 text-black">
              This link is expired in 10 minutes.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
