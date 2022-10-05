import React from 'react';

/**
 * This service is intended to gather information from React.Profiler components
 * It will output gathered measurements into the console @ set interval (default 15s).
 */

type Measurement = {
  phase: 'mount' | 'update';
  actualDuration: number;
};
type Measurements = {[key: string]: {count: number; data: Measurement[]}};

type CompiledMeasurements = {
  [key: string]: {
    mount: {count: number; time: number};
    update: {count: number; time: number};
  };
};

class Measure {
  // Default settings to start the service with
  public static DEFAULT_CONFIG = {
    interval: 15_000,
    maxIntervals: 0,
    shouldSpawnOnStart: true,
  };

  // Messages prepared for the console output
  protected MESSAGES = {
    start: (
      config: Pick<typeof Measure.DEFAULT_CONFIG, 'interval' | 'maxIntervals'>,
    ) =>
      `⏲️  Starting Measure Service Timer @ ${
        config.interval / 1000
      }s interval with ${
        config.maxIntervals !== 0 ? 'max' + config.maxIntervals : 'infinite'
      } intervals`,
    stop: () =>
      `☠️  Stopping Measure Service Timer after ${this.currentInterval} intervals`,
    header: () =>
      `⏲️  Measure Service output @ (${
        this.config.interval / 1000
      }s) interval [ ${this.currentInterval} / ${
        this.config.maxIntervals || '~'
      } ]`,
    separator: ''.padStart(60, '='),
    filler: ' No renders have been registered during current interval '.padEnd(
      5,
      '-',
    ),
    report: (
      phase: 'Mounts' | 'Updates' | 'Total',
      count: number,
      time: number,
    ) => `${phase} => Count: ${count} | Time: ${time}ms`,
  };

  // Final config used by the instantialised service
  private config!: typeof Measure.DEFAULT_CONFIG;

  // Main service timer
  private timer: number | null = null;

  // Current interval, necessary for handling number of repetitions as well as detailed outputs
  private currentInterval = 0;

  // Object containing all measurements categorised by IDs passed downt to React.Profilers
  private measurements: Measurements = {};

  public constructor(config?: typeof Measure.DEFAULT_CONFIG) {
    if (typeof config !== 'undefined') {
      this.config = config;
    }
    if (this.config.shouldSpawnOnStart) {
      this.start(this.config);
    }
  }

  public get isActive(): boolean {
    return this.timer !== null;
  }

  /** Main callback used for React.Profiler's onRender prop */
  public onRender: React.ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
  ) => {
    const measurement = {
      phase,
      actualDuration: parseFloat(actualDuration.toFixed(3)),
    };
    this.measurements = {
      ...this.measurements,
      [id]: {
        data: [measurement, ...(this.measurements[id]?.data || [])],
        count: this.measurements[id]?.count + 1 || 1,
      },
    };
  };

  /**
   * ================================================================================
   * Below are methods responsible for handling the main service timer as well
   * data compilation and printing results to the console
   * ================================================================================
   */

  // Allows for manual start of the service, by default it will be automatically started on service creation
  public start = ({interval, maxIntervals} = Measure.DEFAULT_CONFIG) => {
    console.log(this.MESSAGES.separator);
    console.log(this.MESSAGES.start({interval, maxIntervals}));
    console.log(this.MESSAGES.separator);

    this.timer = setInterval(() => {
      const compiledMeasurements = this.compileMeasurements();

      this.currentInterval++;
      this.printToConsole(compiledMeasurements);
      this.clearMeasurements();

      if (this.currentInterval === maxIntervals) {
        this.stop();
      }
    }, interval);
  };

  // Allows for manual stop of the service. It is also used for killing the timer after a set number of repetitions
  public stop = (shouldDestroyTimer = true) => {
    console.log(this.MESSAGES.separator);
    console.log(this.MESSAGES.stop());
    console.log(this.MESSAGES.separator);

    this.timer !== null && clearInterval(this.timer);
    this.clearMeasurements();

    if (shouldDestroyTimer) {
      this.destroyTimer();
    }
  };

  // Completely remove the timer from the service property
  public destroyTimer = () => {
    this.timer = null;
    this.currentInterval = 0;
  };

  // Reformats data gathered over the last interval and prepares for printing output into the console
  private compileMeasurements = (): CompiledMeasurements => {
    const ids = Object.keys(this.measurements);
    const result: CompiledMeasurements = {};

    for (const id of ids) {
      const dataArr = this.measurements[id].data;
      const mountSumTime = dataArr.reduce<number>(
        (prev, curr) =>
          (curr.phase === 'mount' && curr.actualDuration + prev) || prev,
        0,
      );
      const mountSumCount = dataArr.reduce<number>(
        (prev, curr) => (curr.phase === 'mount' && prev + 1) || prev,
        0,
      );
      const updateSumTime = dataArr.reduce<number>(
        (prev, curr) =>
          (curr.phase === 'update' && curr.actualDuration + prev) || prev,
        0,
      );
      const updateSumCount = dataArr.reduce<number>(
        (prev, curr) => (curr.phase === 'update' && prev + 1) || prev,
        0,
      );

      result[id] = {
        mount: {time: mountSumTime, count: mountSumCount},
        update: {time: updateSumTime, count: updateSumCount},
      };
    }

    return result;
  };

  // Prints data prepared by the compileMeasurements() method
  private printToConsole = (data: CompiledMeasurements) => {
    const dataKeys = Object.keys(data);

    console.log(this.MESSAGES.separator);
    console.log(this.MESSAGES.header());
    console.log('');
    if (dataKeys.length === 0) {
      console.log(this.MESSAGES.filler);
    } else {
      for (const key of dataKeys) {
        const hasRegisteredMounts = data[key].mount.count > 0;
        const hasRegisteredUpdates = data[key].update.count > 0;

        console.log(`#${dataKeys.indexOf(key) + 1} ${key} ::`);
        if (hasRegisteredMounts) {
          console.log(
            this.MESSAGES.report(
              'Mounts',
              data[key].mount.count,
              data[key].mount.time,
            ),
          );
        }
        if (hasRegisteredUpdates) {
          console.log(
            this.MESSAGES.report(
              'Updates',
              data[key].update.count,
              data[key].update.time,
            ),
          );
        }
        if (hasRegisteredMounts && hasRegisteredUpdates) {
          console.log(
            this.MESSAGES.report(
              'Total',
              data[key].update?.count + data[key].mount?.count,
              data[key].update?.time + data[key].mount?.time,
            ),
          );
        }
        console.log('');
      }
    }

    console.log(this.MESSAGES.separator);
  };

  // Clears all gathered measurements
  private clearMeasurements = () => (this.measurements = {});
}

export const measure = new Measure({
  ...Measure.DEFAULT_CONFIG,
  /* You may uncomment the line below if you want to handle start() and stop() manually */
  // shouldSpawnOnStart: false,
});
