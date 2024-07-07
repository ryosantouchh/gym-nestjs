export class BaseEntity<TProps> {
  protected props: TProps

  protected constructor(props: TProps) {
    this.props = props
  }
}
