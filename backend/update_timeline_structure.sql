-- Mise à jour de la structure timeline avec dates et descriptions

UPDATE home_content 
SET 
  content_fr = JSON_OBJECT(
    'title', 'CHRONOLOGIE',
    'phases', JSON_ARRAY(
      JSON_OBJECT(
        'key', 'registrations',
        'label', 'INSCRIPTIONS',
        'startDate', '2026-03-01',
        'endDate', '2026-04-30',
        'description', 'Période d\'inscription des projets utilisant l\'IA'
      ),
      JSON_OBJECT(
        'key', 'deliberation',
        'label', 'DÉLIBÉRATION',
        'startDate', '2026-05-01',
        'endDate', '2026-05-15',
        'description', 'Le jury évalue les projets soumis'
      ),
      JSON_OBJECT(
        'key', 'festival',
        'label', 'FESTIVAL',
        'startDate', '2026-06-01',
        'endDate', '2026-06-03',
        'description', 'Projection des films sélectionnés et remise des prix'
      )
    )
  ),
  content_en = JSON_OBJECT(
    'title', 'TIMELINE',
    'phases', JSON_ARRAY(
      JSON_OBJECT(
        'key', 'registrations',
        'label', 'REGISTRATIONS',
        'startDate', '2026-03-01',
        'endDate', '2026-04-30',
        'description', 'Registration period for AI-powered projects'
      ),
      JSON_OBJECT(
        'key', 'deliberation',
        'label', 'DELIBERATION',
        'startDate', '2026-05-01',
        'endDate', '2026-05-15',
        'description', 'Jury evaluates submitted projects'
      ),
      JSON_OBJECT(
        'key', 'festival',
        'label', 'FESTIVAL',
        'startDate', '2026-06-01',
        'endDate', '2026-06-03',
        'description', 'Screening of selected films and awards ceremony'
      )
    )
  )
WHERE section = 'timeline';