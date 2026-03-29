// AK - 30/Mar/2026: Simple in-memory queue for async processing - keeps things simple without external dependencies

class SimpleQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  // AK - 30/Mar/2026: Add a job to the queue and start processing if not already running
  async add(jobData) {
    this.queue.push({
      id: Date.now() + Math.random(), // AK - 30/Mar/2026: Simple unique ID
      data: jobData,
      attempts: 0,
      createdAt: new Date()
    });

    // AK - 30/Mar/2026: Start processing if we're not already doing it
    if (!this.processing) {
      this.processQueue();
    }
  }

  // AK - 30/Mar/2026: Process jobs one by one (simple approach)
  async processQueue() {
    this.processing = true;

    while (this.queue.length > 0) {
      const job = this.queue.shift(); // AK - 30/Mar/2026: Take first job from queue
      
      try {
        console.log(`📋 Processing job ${job.id} (attempt ${job.attempts + 1})`);
        await this.executeJob(job);
        console.log(`✅ Job ${job.id} completed successfully`);
      } catch (error) {
        job.attempts++;
        console.error(`❌ Job ${job.id} failed (attempt ${job.attempts}):`, error.message);
        
        // AK - 30/Mar/2026: Simple retry logic - try up to 3 times
        if (job.attempts < 3) {
          console.log(`🔄 Retrying job ${job.id}...`);
          this.queue.push(job); // AK - 30/Mar/2026: Put it back at the end
        } else {
          console.error(`💀 Job ${job.id} failed permanently after 3 attempts`);
        }
      }

      // AK - 30/Mar/2026: Small delay between jobs to avoid overwhelming services
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    this.processing = false;
  }

  // AK - 30/Mar/2026: Execute the actual notification job
  async executeJob(job) {
    const { event, config, notificationType } = job.data;

    // AK - 30/Mar/2026: Import services here to avoid circular dependencies
    const { sendEmail } = await import('./emailService.js');
    const { triggerWebhook } = await import('./webhookService.js');
    const { sendSlackMessage } = await import('./slackService.js');

    switch (notificationType) {
      case 'email':
        if (event.email) {
          await sendEmail({
            to: event.email,
            subject: `🚨 ${event.type} detected`,
            text: `Project ${event.project} has a ${event.severity} issue.`,
          });
        }
        break;

      case 'webhook':
        await triggerWebhook(event);
        break;

      case 'slack':
        if (config?.slackWebhook) {
          const message = `🚨 *${event.type}*\nProject: ${event.project}\nSeverity: ${event.severity}`;
          await sendSlackMessage(config.slackWebhook, message);
        }
        break;

      default:
        throw new Error(`Unknown notification type: ${notificationType}`);
    }
  }

  // AK - 30/Mar/2026: Get queue status for debugging
  getStatus() {
    return {
      queueLength: this.queue.length,
      processing: this.processing,
      jobs: this.queue.map(job => ({
        id: job.id,
        type: job.data.notificationType,
        attempts: job.attempts,
        createdAt: job.createdAt
      }))
    };
  }
}

// AK - 30/Mar/2026: Single instance for the whole app
export const notificationQueue = new SimpleQueue();