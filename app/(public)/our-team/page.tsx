import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const teamMembers = [
  {
    name: "Vishal Bhardwaj",
    role: "Founder and President",
    bio: "Vishal is a visionary leader with a passion for celebrating multiculturalism. With over a decade of experience in event planning and community initiatives, he founded Nova Multifest Society to create a platform that brings diverse communities together through art and culture.",
  },
  {
    name: "Akash Pandey",
    role: "Vice-President",
    bio: "Akash is passionate about fostering diversity and inclusivity. With a background in community outreach and arts programming, he supports Nova Multifest’s mission by ensuring each event is engaging and meaningful for participants and audiences alike.",
  },
  {
    name: "Indu Sehgal",
    role: "Treasurer",
    bio: "Indu brings extensive experience in financial management and organizational leadership. As Treasurer, she oversees financial planning and ensures the organization’s resources are managed effectively to support Nova Multifest’s growth.",
  },
  {
    name: "Tina Rossi",
    role: "Secretary",
    bio: "Tina is an accomplished executive assistant with expertise in administrative support and organizational management. She ensures seamless communication and coordination across the organization’s leadership and community partners.",
  },
  {
    name: "Juanita Peters",
    role: "Director",
    bio: "Juanita is an award-winning actor, filmmaker, and theatre director. She brings a wealth of experience in storytelling and cultural representation, supporting Nova Multifest’s commitment to elevate diverse voices.",
  },
  {
    name: "Rick Cummings",
    role: "Director",
    bio: "Rick is a retired longshoreman and union leader, known for his dedication to workers’ rights and community development. His leadership and advocacy experience strengthen the organization’s community-centered initiatives.",
  },
  {
    name: "Barry Moore",
    role: "Director",
    bio: "Barry is a proud member of the Mi’kmaq nation and an advocate for Indigenous culture and heritage. He brings a unique perspective and deep commitment to cultural preservation and community engagement.",
  },
]

export default function OurTeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Team"
        title="Meet the Nova Multifest Society team"
        description="A community-led organization dedicated to art, culture, and diversity in Nova Scotia."
      />

      <section className="pb-12 sm:pb-16">
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            {teamMembers.map((member) => (
              <Card key={member.name}>
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    {member.role}
                  </p>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  {member.bio}
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
