import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  try {
    const body = await req.json();

    // Validate questions
    if (
      !body.questions ||
      !Array.isArray(body.questions) ||
      !body.questions.every(
        (q) =>
          typeof q.question === 'string' &&
          (q.options === undefined || Array.isArray(q.options)) &&
          typeof q.answer === 'string'
      )
    ) {
      return NextResponse.json(
        { error: 'Invalid or missing questions array' },
        { status: 400 }
      );
    }

    if (!body.accessToken) {
      return NextResponse.json(
        { error: 'Missing access token' },
        { status: 401 }
      );
    }

    const accessToken = body.accessToken;

    // Step 1: Create the form with only title
    const createFormResponse = await axios.post(
      'https://forms.googleapis.com/v1/forms',
      {
        info: {
          title: body.title || 'Generated Quiz',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const formId = createFormResponse.data.formId;

    // Step 2: Prepare batchUpdate requests for questions
    const requests = body.questions.map((q, index) => {
      if (q.options && q.options.length > 0) {
        // Multiple choice question
        return {
          createItem: {
            item: {
              title: q.question,
              questionItem: {
                question: {
                  required: true,
                  choiceQuestion: {
                    type: 'RADIO',
                    options: q.options.map((opt) => ({ value: opt })),
                    shuffle: false,
                  },
                },
              },
            },
            location: {
              index,
            },
          },
        };
      } else {
        // Short answer question
        return {
          createItem: {
            item: {
              title: q.question,
              questionItem: {
                question: {
                  required: true,
                  textQuestion: {},
                },
              },
            },
            location: {
              index,
            },
          },
        };
      }
    });

    // Step 3: Send batchUpdate request to add questions
    await axios.post(
      `https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`,
      { requests },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json({
      message: 'Form created with questions!',
      formId,
      formUrl: `https://docs.google.com/forms/d/${formId}/edit`,
      questions: body.questions,
    });
  } catch (err) {
    console.error('Error creating quiz form:', err.response?.data || err.message);
    return NextResponse.json(
      { error: 'Failed to create quiz: ' + (err.response?.data?.error?.message || err.message) },
      { status: 500 }
    );
  }
}
