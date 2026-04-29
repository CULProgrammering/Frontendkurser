/**
 * Research document registry.
 * To add a new doc: drop the .md file in the project root, then add an entry here.
 * Newest first.
 */
export interface ResearchDoc {
  id: string
  title: string
  date: string
  tags: string[]
  file: string
}

export const docs: ResearchDoc[] = [
  {
    id: 'workshop-microstep-format',
    title: 'Workshop Micro-Step Format: Implementation, Trade-offs, and Outcomes',
    date: '2026-04-29',
    tags: ['pedagogy', 'micro-step', 'reset vs persist', 'fading worked examples', 'PRIMM', 'beginner programming', 'frontendkurser'],
    file: '2026-04-29-workshop-microstep-format.md',
  },
  {
    id: 'online-course-lesson-architecture',
    title: 'Online Programming Course Lesson Architecture',
    date: '2026-04-28',
    tags: ['pedagogy', 'course design', 'PRIMM', '4C/ID', 'cognitive load', 'beginner programming', 'frontendkurser'],
    file: '2026-04-28-online-course-lesson-architecture.md',
  },
]
