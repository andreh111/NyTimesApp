import 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';
import ArticleListContainer from '../src/components/ArticleListContainer';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(() => ({})),
  };
});

it('renders correctly', () => {
  renderer.create(
    <ArticleListContainer
      data={[
        {
          abstract:
            'A new report projects that economic growth will slow this year and remain weak in 2024.',
          web_url:
            'https://www.nytimes.com/2023/06/06/business/economy/world-bank-projections.html',
          snippet:
            'A new report projects that economic growth will slow this year and remain weak in 2024.',
          lead_paragraph:
            'The World Bank said on Tuesday that the global economy remained in a “precarious state” and warned of sluggish growth this year and next as rising interest rates slow consumer spending and business investment, and threaten the stability of the financial system.',
          print_section: 'B',
          print_page: '4',
          source: 'The New York Times',
          multimedia: [
            {
              rank: 0,
              subtype: 'xlarge',
              caption: null,
              credit: null,
              type: 'image',
              url: 'images/2023/06/07/multimedia/06dc-globalecon-print-ptwh/06dc-globalecon-ptwh-articleLarge.jpg',
              height: 400,
              width: 600,
              legacy: {
                xlarge:
                  'images/2023/06/07/multimedia/06dc-globalecon-print-ptwh/06dc-globalecon-ptwh-articleLarge.jpg',
                xlargewidth: 600,
                xlargeheight: 400,
              },
            },
          ],
        },
        {
          abstract:
            'South Africa is accused of helping supply Russia with weapons for the Ukraine war, a charge that South Africa denies.',
          web_url:
            'https://www.nytimes.com/2023/06/12/world/africa/south-africa-russia-us-lawmakers.html',
          snippet:
            'South Africa is accused of helping supply Russia with weapons for the Ukraine war, a charge that South Africa denies.',
          lead_paragraph:
            'A bipartisan group of American lawmakers has asked the Biden administration to punish South Africa for what it sees as the country’s support of Russia’s war in Ukraine by moving a major trade conference scheduled to be held in South Africa this year to another country.',
          print_section: 'A',
          print_page: '15',
          source: 'The New York Times',
          multimedia: [
            {
              rank: 0,
              subtype: 'xlarge',
              caption: null,
              credit: null,
              type: 'image',
              url: 'images/2023/06/12/multimedia/12safrica-russia-1-cbjh/12safrica-russia-1-cbjh-articleLarge.jpg',
              height: 420,
              width: 600,
              legacy: {
                xlarge:
                  'images/2023/06/12/multimedia/12safrica-russia-1-cbjh/12safrica-russia-1-cbjh-articleLarge.jpg',
                xlargewidth: 600,
                xlargeheight: 420,
              },
            },
          ],
        },
      ]}
      isSearching
    />,
  );
});
