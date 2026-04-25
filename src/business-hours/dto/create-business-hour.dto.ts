import { IsInt, Min, Max, Matches } from 'class-validator';

export class CreateBusinessHourDto {
  @IsInt()
  @Min(0)
  @Max(6)
  dayOfWeek: number;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'openTime must be in HH:mm format' })
  openTime: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'closeTime must be in HH:mm format' })
  closeTime: string;
}
