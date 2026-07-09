var TOUR_CONFIG = {
  animate: true,
  overlayOpacity: 0.6,
  showProgress: true,
  allowClose: false,
  doneBtnUrl: 'https://www.queuemetrics.com/landing/trial-qm-p.jsp?lid=994',
  doneBtnText: 'Let\'s do it!',
  nextBtnText: 'Next &rarr;',
  prevBtnText: '&larr; Back',

  onPopoverRender: function (popover) {
    var INDEX_URL = 'index.html?step=0';

    if (!document.getElementById('tour-toc-style')) {
      var style = document.createElement('style');
      style.id = 'tour-toc-style';
      style.textContent = `
        .driver-popover {
          width: min(350px, 90vw) !important;
          min-width: min(350px, 90vw) !important;
          box-sizing: border-box !important;
        }

        .driver-popover-description {
          max-width: 100% !important;
          padding-bottom: 34px !important;
        }

        .tour-welcome-image {
          display: block;
          margin: 0 auto 14px auto;
          max-width: 100%;
          height: auto;
        }

        .tour-toc {
          display: grid;
          gap: 8px;
          margin-top: 14px;
        }

        .tour-toc-link {
          display: block;
          padding: 9px 11px;
          border-radius: 7px;
          background: #f4f6f8;
          color: #1b2b44;
          text-decoration: none;
          font-weight: 600;
          border: 1px solid #e2e7ee;
        }

        .tour-toc-link:hover {
          background: #e8edf3;
          text-decoration: none;
        }

        .driver-popover-footer {
          display: grid !important;
          grid-template-columns: 90px 1fr auto;
          align-items: center !important;
          gap: 8px !important;
          padding-left: 0 !important;
        }

        .driver-popover-progress-text {
          grid-column: 2;
          justify-self: center;
          text-align: center;
          white-space: nowrap;
        }

        .driver-popover-navigation-btns {
          grid-column: 3;
          justify-self: end;
          display: flex !important;
          gap: 6px;
        }

        .driver-popover-footer button,
        .driver-popover-footer .driver-popover-btn {
          border-radius: 5px !important;
          border: 1px solid #FD701F !important;
          outline: none !important;
          box-shadow: none !important;
        }

        .driver-popover-footer button:focus,
        .driver-popover-footer button:focus-visible,
        .driver-popover-footer .driver-popover-btn:focus,
        .driver-popover-footer .driver-popover-btn:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }

        .tour-back-to-index {
          position: absolute;
          left: 11px;
          bottom: 15px;
          display: inline-flex;
          align-items: center;
          min-height: 10px;
          padding: 2px 4px;
          border-radius: 5px;
          background: transparent;
          color: #6b7280 !important;
          text-decoration: none !important;
          font-size: 12px;
          font-weight: 500;
          border: 1px solid transparent !important;
          outline: none !important;
          box-shadow: none !important;
          cursor: pointer;
          pointer-events: auto !important;
          z-index: 999999;
        }

        .tour-back-to-index:hover,
        .tour-back-to-index:focus,
        .tour-back-to-index:focus-visible {
          background: #f4f6f8;
          color: #1b2b44 !important;
          border-color: #e2e7ee !important;
          text-decoration: none !important;
          outline: none !important;
          box-shadow: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    if (!popover.description) {
      return;
    }

    var isIndexStep = popover.description.querySelector('.tour-toc');

    if (isIndexStep) {
      return;
    }

    if (popover.description.querySelector('.tour-back-to-index')) {
      return;
    }

    var backLink = document.createElement('a');
    backLink.href = INDEX_URL;
    backLink.className = 'tour-back-to-index';
    backLink.textContent = 'Back to Index';

    backLink.addEventListener('mousedown', function (event) {
      event.stopPropagation();
    });

    backLink.addEventListener('click', function (event) {
      event.stopPropagation();
    });

    popover.description.appendChild(backLink);
  }
};

var TOUR = [

// Login page

  {
    page: 'index.html',
    steps: [
        {
          element: '.page-header',
          popover: {
            title: '',
            description: `
            <style>
            .driver-popover {
              width: min(400px, 90vw) !important;
              max-width: min(400px, 90vw) !important;
            }
            .driver-popover-description {
              max-width: 100% !important;
            }
          </style>
              <img src="Welcome.png" class="tour-welcome-image" alt="Welcome to the QueueMetrics tour">
              <p>Choose a section to explore, or press Next to follow the complete tour.</p>
              <p>(you can use your keyboard arrow keys to navigate)</p>
              <div class="tour-toc">
                <a href="homepage.html?step=2" class="tour-toc-link" onclick="event.stopPropagation();">Homepage and administration</a>
                <a href="wallboard.html?step=7" class="tour-toc-link" onclick="event.stopPropagation();">Live wallboards</a>
                <a href="report.html?step=21" class="tour-toc-link" onclick="event.stopPropagation();">Historical reports</a>
                <a href="report-details.html?step=35" class="tour-toc-link" onclick="event.stopPropagation();">Call details and Recordings</a>
                <a href="qap.html?step=44" class="tour-toc-link" onclick="event.stopPropagation();">Agent Page and Softphone</a>
              </div>
            `
        }
      },
      {
        element: '.qm-auth',
        popover: {
          title: 'Sign in',
          description: 'Sign in using a local QueueMetrics account or your preferred SSO option.'
        }
      }
    ]
  },

// Homepage

  {
    page: 'homepage.html',
    steps: [
      {
        element: '.home-box',
        popover: {
          title: 'Your QueueMetrics homepage',
          description: 'Here you can reach reports, wallboards, administration, and the tools you use every day.',
          side: 'left',
          align: 'center',
        }
      },
      {
        element: '.homepage-top-bar-addinfobox [role="button"]',
        popover: {
          title: 'Customize your Homepage',
          description: 'Here you can add or remove homepage shortcuts, so the page shows what you use most.'
        }
      },
      {
        element: '.homepage-top-bar-administration-menu [role="button"]',
        popover: {
          title: 'Access the QueueMetrics configuration',
          description: 'Here you can open the administration area and manage system settings.'
        }
      }
     ]
    },
    {
    page: 'homepage5.html',
    steps: [
      {
        element: '.infoBoxGrid > div:nth-child(1)',
        popover: {
          title: 'See your live queue data',
          description: 'Wallboards give you a live view of your contact center. You can monitor queues, calls, waiting times, and agent status as they change throughout the day.',
          side: 'right',
          align: 'center',
        }
      },
      {
        element: '[aria-labelledby="WALLBOARDS"] .quick-links ul[aria-label="Quicklinks"] > li:nth-of-type(4)',
        popover: {
          title: 'Let\'s check the live stats',
          description: 'Open the General Info wallboard, to access the live stats for today.',
          side: 'right',
          align: 'center',
        }
      }
    ]
  },

// Wallboard

  {
    page: 'wallboard.html',
    steps: [
      {
        element: '.dynamic-el',
        popover: {
          title: 'Welcome to the QueueMetrics Wallboards',
          description: `
          <style>
            .driver-popover {
              width: min(500px, 90vw) !important;
              max-width: min(500px, 90vw) !important;
            }
            .driver-popover-description {
              max-width: 100% !important;
            }
            .driver-overlay {
              opacity: 0 !important;
              fill: transparent !important;
              background: transparent !important;
            }
            .driver-stage {
              background: transparent !important;
              box-shadow: none !important;
            }
            .dynamic-el {
              background: transparent !important;
              border: none !important;
              box-shadow: none !important;
            }
          </style>

            <p>The Wallboards give you realtime stats on the queue activity in your contact center.</p>
          `,
          side: 'bottom',
          align: 'center',
        }
      },
      {
        element: 'div.react-grid-item:nth-child(1)',
        popover: {
          title: 'Answered calls',
          description: 'Here you can see how many calls have been answered in real time.',
          side: 'bottom',
          align: 'center',
        }
      },     
      {
        element: 'div.react-grid-item:nth-child(2)',
        popover: {
          title: 'Lost calls',
          description: 'The calls that were not answered by your agents so far, today.',
          side: 'bottom',
          align: 'center',
        }
      },
      {
        element: 'div.react-grid-item:nth-child(4)',
        popover: {
          title: 'Longest wait',
          description: 'As well as the longest current waiting call, before it becomes a service issue.',
          side: 'bottom',
          align: 'center',
        }
      },
      {
        element: 'div.react-grid-item:nth-child(5)',
        popover: {
          title: 'Customizable graphs',
          description: 'You can customize the charts and graphs to give you the most relevant data, like the missed calls per agent.',
          side: 'left',
          align: 'center',
        }
      },
      {
        element: 'div.react-grid-item:nth-child(6)',
        popover: {
          title: 'Who is available right now?',
          description: 'Here you can see which agents are available, busy, or paused.'
        }
      },
      {
        element: '#tour-live-agents-widget-menu-target',
        popover: {
          title: 'Customizable appearance',
          description: 'All widgets are customizable. You can change the title, add filters and more',
          side: 'right',
          align: 'center',
        }
      },
      {
        element: '.RtTopBar .L-pointer.L-row.L-gap-4',
        popover: {
          title: 'Control queue visibility',
          description: 'Here you can choose which queues are shown on the wallboard.',
          side: 'left',
          align: 'center',
        }
      },
      {
        element: '[aria-label="WebRTC Softphone"]',
        popover: {
          title: 'Softphone included on the Wallboard',
          description: 'You can use the QueueMetrics softphone directly from the browser to listen in on ongoing calls.',
          side: 'left',
          align: 'center',
        }
      },
      {
        element: '[aria-label="Add New Widget"]',
        popover: {
          title: 'Make it your own',
          description: 'Here you can choose between more than 30 widgets and build the wallboard layout you need.',
          side: 'left',
          align: 'center',
        }
      },
      {
        element: '[aria-label="Show/Hide Filters"]',
        popover: {
          title: 'Wallboard filters',
          description: 'The Wallboard supports customizable filters, to refine the data that you are presented with.',
          side: 'left',
          align: 'center',
        }
      },
      {
        element: '[aria-label="Load wallboard"]',
        popover: {
          title: 'Open another wallboard',
          description: 'You can access other private or public wallboards from here.',
          side: 'left',
          align: 'center',
        }
      }
    ]
  },

// Homepage

    {
    page: 'homepage6.html',
    steps: [
      {
        element: '.infoBoxGrid > div:nth-child(2)',
        popover: {
          title: 'Let\'s have a look at the historic reports',
          description: 'Here we can see details for calls, agents, queues, and service quality for past activity.',
          side: 'left',
          align: 'center',
        }
      },
      {
        element: '[aria-labelledby="REPORTS"] .quick-links ul[aria-label="Quicklinks"] > li:nth-of-type(4)',
        popover: {
          title: 'A simple default report',
          description: 'Open the Overview report to start reviewing queue performance.',
          side: 'left',
          align: 'center',
        }
      }
    ]
  },

// Report

  {
    page: 'report.html',
    steps: [
        {
        element: '.dynamic-el',
        popover: {
          title: 'Welcome to the QueueMetrics Reporting section',
          description: `
          <style>
            .driver-popover {
              width: min(500px, 90vw) !important;
              max-width: min(500px, 90vw) !important;
            }
            .driver-popover-description {
              max-width: 100% !important;
            }
            .driver-overlay {
              opacity: 0 !important;
              fill: transparent !important;
              background: transparent !important;
            }
            .driver-stage {
              background: transparent !important;
              box-shadow: none !important;
            }
            .dynamic-el {
              background: transparent !important;
              border: none !important;
              box-shadow: none !important;
            }
          </style>

            <p>Navigate trough the historic reports, to see exactly what happened on your queues.</p>
          `,
          side: 'bottom',
          align: 'center',
        }
      },
      {
        element: '.reportpanel.L-column.L-gap-24 > div:nth-child(1) ',
        popover: {
          title: 'Report tabs',
          description: 'A report can be split into multiple sections to make things easier to manage.',
          side: 'top',
          align: 'center',
        }
      },
      {
        element: '[title="Go to Ans.Dt."]',
        popover: {
          title: 'Let\'s start from the answered call list',
          description: `
            <style>
            .driver-popover {
              width: min(400px, 90vw) !important;
              max-width: min(400px, 90vw) !important;
            }
            .driver-popover-description {
              max-width: 100% !important;
            }
          </style>
          Open answered details to review individual answered calls.`,
          side: 'right',
          align: 'center',
        }
      },
      {
        element: '.ReportPage-datablocks',
        popover: {
          title: 'Answered call records',
          description: 'This table shows each answered call with agent, queue, and timing details.',
          side: 'top',
          align: 'center',
        }
      }
    ]
  },
  {
    page: 'report-attempts.html',
    steps: [
      {
        element: '[title="Go to Att."]',
        popover: {
          title: 'Who missed the most calls?',
          description: 'Use the Attempts tab to review call attempt history for the selected period.',
          side: 'right',
          align: 'center',
        }
      },
      {
        element: '.ReportPage-datablocks',
        popover: {
          title: 'Call attempt records',
          description: 'These records show you how many call attempts the PBX sent to the agents, lower is better',
          side: 'right',
          align: 'center',
        }
      },
      {
        element: '.dynamic-el',
        popover: {
          title: 'This is just a taste',
          description: `Of the over 200 datablocks you can use in QueueMetrics`,
          side: 'bottom',
          align: 'center',
        }
      },
    ]
  },
  {
    page: 'report-configuration.html',
    steps: [
      {
        element: '.TimeSelector',
        popover: {
          title: 'Let\'s configure a Report',
          description: 'Choose the time period you want to analyze.',
          side: 'right',
          align: 'start',
        }
      },
      {
        element: '.QueueSelector',
        popover: {
          title: 'Select one, or multiple queues',
          description: 'Choose which queues should be included in the report.',
          side: 'right',
          align: 'center',
        }
      },
      {
        element: '[aria-label="Add Filters"]',
        popover: {
          title: 'Configure filters',
          description: 'There are more than 40 filter to choose between. Filters like the caller number, call duration, specific agent or group of agents.',
          side: 'right',
          align: 'center',
        }
      },
      {
        element: '.LFlyover',
        popover: {
          title: 'Act upon your report',
          description: 'You can perform actions such as: cloning the current report or creating a new on; exporting the report, or schedule it to be sent to you automatically, and more.',
          side: 'left',
          align: 'start',
        }
      },
      {
        element: '.ReportPage-buttons',
        popover: {
          title: 'Customize the current tab',
          description: 'Use these tools to edit, print, or customize the current report page.',
          side: 'right',
          align: 'center',
        }
      },
      {
        element: 'div.menuDesktop:has([aria-label="Edit DataBlock"]):has([aria-label="Customize Columns"]):has([aria-label="Delete DataBlock View"])',
        popover: {
          title: 'Customize each table (datablock)',
          description: 'Use DataBlock menu to edit the datablock, customize columns, or remove the datablock from the report.',
          side: 'right',
          align: 'center',
        }
      },
      {
        element: 'a[loway-icon="search"][href="javascript:timeline(\'OK-1779806655-c.741591061\');"]',
        popover: {
          title: 'What happened to the Call?',
          description: 'Open the timeline to follow how this call moved through the system.',
          side: 'right',
          align: 'center',
        }
      },
    ]
  },
  {
    page: 'report-details.html',
    steps: [
      {
        element: '.dynamic-el',
        popover: {
          title: 'Call details and call recordings',
          description: `
          <style>
            .driver-popover {
              width: min(400px, 90vw) !important;
              max-width: min(400px, 90vw) !important;
            }
            .driver-popover-description {
              max-width: 100% !important;
            }
            .driver-overlay {
              opacity: 0 !important;
              fill: transparent !important;
              background: transparent !important;
            }
            .driver-stage {
              background: transparent !important;
              box-shadow: none !important;
            }
            .dynamic-el {
              background: transparent !important;
              border: none !important;
              box-shadow: none !important;
            }
          </style>

            <p>Here you will find details for individual calls.</p>
          `,
          side: 'bottom',
          align: 'center',
        }
      },
      {
        element: '.InteractionTableBody',
        popover: {
          title: 'Call recap',
          description: 'This panel shows the details for the selected call.',
          side: 'right',
          align: 'center',
        }
      },
      {
        element: '.LowayTimeline.qm-scrollbar',
        popover: {
          title: 'Call Timeline',
          description: 'As well as the timeline for each step of the call, from entry to completion.',
          side: 'left',
          align: 'center',
        }
      },
      {
        element: '.LowayTimeline.qm-scrollbar > div:nth-child(2) > div:nth-child(4) > div:nth-child(2)',
        popover: {
          title: 'Gotcha',
          description: 'The Agent didn\'t pick up the call. The PBX sent the call to another agent.',
          side: 'left',
          align: 'center',
        }
      },
      {
        element: '[title="Go to QA/Recordings"]',
        popover: {
          title: 'Evaluating the quality of the call',
          description: 'Open QA and Recordings to review the audio and the Quality Assurance form for this call.',
          side: 'bottom',
          align: 'center',
        }
      }
    ]
  },
  {
    page: 'report-qa.html',
    steps: [
      {
        element: '.LowayAudioPlayer',
        popover: {
          title: 'Call recording',
          description: 'Listen to the selected call recording with the embedded audio player. The audio can be sped up or paused.',
          side: 'left',
          align: 'center',
        }
      },
      {
        element: '.Marker',
        popover: {
          title: 'Add Markers',
          description: 'You can add markers to the recording, and jump between them.',
          side: 'left',
          align: 'center',
        }
      },
      {
        element: '.QATable.qm-scrollbar',
        popover: {
          title: 'Quality Assurance form',
          description: 'You can evaluate the call using custom forms. The data is available for further analysis in the QA section of QueueMetrics.</br> Find issues before they find you.',
          side: 'top',
          align: 'center',
        }
      },
      {
        element: '.dynamic-el',
        popover: {
          title: 'And now for something completely different',
          description: `
          <style>
            .driver-popover {
              width: min(460px, 90vw) !important;
              max-width: min(500px, 90vw) !important;
            }
            .driver-popover-description {
              max-width: 100% !important;
            }
            .driver-overlay {
              opacity: 0 !important;
              fill: transparent !important;
              background: transparent !important;
            }
            .driver-stage {
              background: transparent !important;
              box-shadow: none !important;
            }
            .dynamic-el {
              background: transparent !important;
              border: none !important;
              box-shadow: none !important;
            }
          </style>

            <p>Let\'s have a look at the QueueMetrics Agent Page.</p>
          `,
          side: 'bottom',
          align: 'center',
        }
      }
    ]
  },

// QueueMetrics Agent Page

  {
    page: 'qap.html',
    steps: [
      {
        element: '.dynamic-el',
        popover: {
          title: 'This is the QueueMetrics Agent Page',
          description: `
          <style>
            .driver-popover {
              width: min(460px, 90vw) !important;
              max-width: min(500px, 90vw) !important;
            }
            .driver-popover-description {
              max-width: 100% !important;
            }
            .driver-overlay {
              opacity: 0 !important;
              fill: transparent !important;
              background: transparent !important;
            }
            .driver-stage {
              background: transparent !important;
              box-shadow: none !important;
            }
            .dynamic-el {
              background: transparent !important;
              border: none !important;
              box-shadow: none !important;
            }
          </style>

            <p>The Agent Page gives agents access to their daily tools, including status, calls, controls, and the browser softphone.</p>
          `,
          side: 'top',
          align: 'center'
        }
      },
      {
        element: '.L-column.L-gap-24.QAPOverview',
        popover: {
          title: 'Daily Recap',
          description: 'Agents can see their status, current calls, and recent activity from this overview.',
          side: 'top',
          align: 'center',
        }
      }
      ]
    },
    {
    page: 'qap-softphone.html',
    steps: [
      {
        element: '.QAPPhonePanel',
        popover: {
          title: 'Embedded softphone',
          description: 'The Agent can use the QueueMetrics softphone to handle calls directly from the Agent Page.',
          side: 'top',
          align: 'center',
        }
      }
    ]
  },
  {
    page: 'qap-navigation.html',
    steps: [
      {
        element: '.L-column.L-gap-16.qm-scrollbar',
        popover: {
          title: 'Using the Agent Page',
          description: 'Use these icons to navigate between the tools available on the Agent Page.',
          side: 'right',
          align: 'center',
        }
      },      
      {
        element: '[aria-label="Control"]',
        popover: {
          title: 'Manage you availability',
          description: 'Open the Control page, to manage queue availability and pause status.',
          side: 'right',
          align: 'center',
        }
      }
    ]
  },
  {
    page: 'qap-control.html',
    steps: [
      {
        element: '.QueueList-grid.qm-scrollbar.L-row.L-gap-24.L-wrap',
        popover: {
          title: 'Control queue presence',
          description: 'The Agent can log in, or log out of the available queues.',
          side: 'right',
          align: 'center',
        }
      },
      {
        element: '.L-row.L-gap-16.PauseMenu.L-align-flexend',
        popover: {
          title: 'Pause / Unpause',
          description: 'Choose between customizable pauses, so Supervisors know your status.',
          side: 'top',
          align: 'center',
        }
      },     
      {
        element: '[aria-label="Interactions"]',
        popover: {
          title: 'Manage calls',
          description: 'Open the Interactions page to manage calls and see current and recent calls.',
          side: 'right',
          align: 'center',
        }
      }
    ]
  },
  {
    page: 'qap-interactions.html',
    steps: [
      {
        element: '.InteractionList',
        popover: {
          title: 'Call list',
          description: 'Review the agent\'s recent calls and interactions in this list.',
          side: 'top',
          align: 'center',
        }
      },
      {
        element: '[aria-label="Label Interaction"]',
        popover: {
          title: 'Call Outcomes',
          description: 'Add an outcome to the selected interaction for easier follow up.',
          side: 'left',
          align: 'center',
        }
      },      
      {
        element: '[aria-label="Details"]',
        popover: {
          title: 'Call details',
          description: 'Open the full details for the selected call. You will find all the details that QueueMetrics knows about the specific call.',
          side: 'left',
          align: 'center',
        }
      },
      {
        element: '[aria-label="Calendar"]',
        popover: {
          title: 'Calendar',
          description: 'Open the calendar to review scheduled agent activity. ',
          side: 'left',
          align: 'center',
        }
      }
    ]
  },
  {
    page: 'qap-calendar.html',
    steps: [
      {
        element: '.WeekView',
        popover: {
          title: 'Calendar view',
          description: 'Review agent activity by date in the calendar view.',
          side: 'top',
          align: 'center',
        }
      },
      {
        element: '.WeekView > div:nth-child(3) > div:nth-child(2) > div:nth-child(4)',
        popover: {
          title: 'Call Back',
          description: 'Schedule call backs on the calendar',
          side: 'top',
          align: 'center',
        }
      },
      {
          element: '.dynamic-el',
          popover: {
            title: 'Thank you for joining the QueueMetrics tour',
            description: 'If you haven\'t already, request a free trial. We\'ll be happy to configure QueueMetrics for you!',
            side: 'bottom',
            align: 'center'
          }
        }
    ]
  }
];