import { searchClient } from '@algolia/client-search'
import settings from '@Kivora.Infraestructure/Settings'

export const algoliaClient = searchClient(
    settings.ALGOLIA_APP_ID,
    settings.ALGOLIA_API_KEY
)

// Fetch and index objects in Algolia
// const processRecords = async () => {
//     // const datasetRequest = await fetch(
//     //     'https://dashboard.algolia.com/sample_datasets/movie.json'
//     // )
//     const searchData = [
//         {
//             search_query: 'ps4',
//             search_count: 1, // Este contador puede incrementarse cada vez que se registre una búsqueda
//             timestamp: new Date().toISOString()
//         }
//     ]
//     return await client.saveObjects({
//         indexName: 'search_index',
//         objects: searchData
//     })
// }

// processRecords()
//     .then(() => console.log('Successfully indexed objects!'))
//     .catch((err) => console.error(err))
