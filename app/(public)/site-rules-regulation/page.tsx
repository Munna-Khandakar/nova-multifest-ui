import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const goals = [
  "TO SUPPORT AND CELEBRATE OUR PROVINCE'S RICH TAPESTRY OF CULTURE AND DIVERSITY.",
  "TO ENSURE THAT MULTICULTURAL COMMUNITIES CAN CELEBRATE AND PRESERVE TRADITIONS IN MEANINGFUL WAYS.",
  "TO PROMOTE ART AND CULTURE IN INNOVATIVE WAYS ACROSS THE HALIFAX REGIONAL MUNICIPALITY.",
  "TO FOSTER CROSS-CULTURAL AWARENESS, UNDERSTANDING, COMMUNITY UNITY AND INTERCULTURAL RELATIONSHIPS.",
  "TO UNITE AND PROMOTE DIVERSITY IN THE HALIFAX REGIONAL MUNICIPALITY.",
]

const stipulations = [
  "NO SMOKING IS ALLOWED ONSITE.",
  "NO UNRULY BEHAVIOUR.",
  "NO FOLDING CHAIRS OR OTHER LARGE ACCESSORIES (FOR EXAMPLE SUNSHADE, TENTS, SIGNS) ARE ALLOWED TO BE TAKEN INTO THE SITE.",
  "NO POLITICAL DEMONSTRATIONS.",
  "NO ALCOHOL IS ALLOWED TO BE TAKEN IN/OUT OF THE SITE.",
  "ONLY SERVICE DOGS ALLOWED.",
]

export default function SiteRulesRegulationPage() {
  return (
    <>
      <PageHeader title="RULES & REGULATIONS" />

      <section className="pb-12 sm:pb-16">
        <Container>
          <div className="grid gap-8">
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg font-semibold uppercase tracking-wide">
                  NOVA MULTIFEST SOCIETY IN COLLABORATION WITH ALDERNEY LANDING WELCOME YOU TO OUR ANNUAL NOVA MULTIFEST. NOVA MULTIFEST IS A FREE THREE-DAY EVENT WHOSE GOALS ARE:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm font-medium uppercase text-foreground/80 sm:text-base">
                  {goals.map((goal) => (
                    <li key={goal} className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-primary" />
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg font-semibold uppercase tracking-wide">
                  ACCESS TO THE SITE IS CONTROLLED AND ADMISSION TO THE PUBLIC IS GRANTED UNDER THE FOLLOWING STIPULATIONS:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm font-medium uppercase text-foreground/80 sm:text-base">
                  {stipulations.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="space-y-4 text-base text-muted-foreground">
              <p>
                Although this event is free to the public, Nova Multifest Society and Alderney Landing reserve the right to limit access to the festival site if any individual or group does not follow these conditions.
              </p>
              <p>
                In the case of an emergency (weather induced or other unprecedented safety issue) nova multifest society and alderney landing reserve the right to evacuate the festival site if deemed necessary.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
