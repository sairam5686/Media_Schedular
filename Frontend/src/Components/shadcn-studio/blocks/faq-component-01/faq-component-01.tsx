import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export type FAQItem = {
  question: string
  answer: string
}

export const defaultFaqItems: FAQItem[] = [
  {
    question: 'Do you charge for each upgrade?',
    answer:
      'Some upgrades are free, while others may have an additional cost, depending on the type of upgrade and your current plan. For specific pricing details, please check our pricing page or contact our support team.'
  },
  {
    question: 'Do I need to purchase a license for each website?',
    answer:
      'Yes, you need to purchase a separate license for each website where you plan to use our components. Each license is tied to a single domain and its subdomains. This ensures proper licensing compliance and helps us maintain and improve our products for all users.'
  },
  {
    question: 'What is regular license?',
    answer:
      'A regular license grants you the right to use our components on a single website or project. It includes access to all basic features, documentation, and standard support. This license is perfect for individual developers or small businesses working on a single project.'
  },
  {
    question: 'What is extended license?',
    answer:
      'An extended license provides additional rights and features beyond the regular license. It includes usage rights for multiple websites, priority support, access to premium components, and the ability to use components in commercial projects that you sell to end customers. Perfect for agencies and large enterprises.'
  }
]

const FAQ = ({ faqItems = defaultFaqItems }: { faqItems?: FAQItem[] }) => {
  return (
    <section id="faq" className='py-16 sm:py-20 lg:py-28 bg-white scroll-mt-16'>
      <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
        {/* FAQ Header */}
        <div className='mb-12 space-y-4 text-center sm:mb-16'>
          <h2 className='text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl'>
            Need Help? We&apos;ve Got Answers
          </h2>
          <p className='text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed'>
            Explore Our Most Commonly Asked Questions and Find the Information You Need.
          </p>
        </div>

        <Accordion className='w-full divide-y divide-neutral-200/80 border-t border-b border-neutral-200/80' defaultValue={['item-1']}>
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`} className='border-none py-1'>
              <AccordionTrigger className='text-lg font-medium text-neutral-900 hover:no-underline hover:text-neutral-600 transition-colors cursor-pointer py-4.5'>
                {item.question}
              </AccordionTrigger>
              <AccordionContent className='text-neutral-600 text-base leading-relaxed pb-4'>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export default FAQ
