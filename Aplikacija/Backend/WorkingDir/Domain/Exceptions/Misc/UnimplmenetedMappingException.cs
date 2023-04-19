namespace Domain.Exceptions;

public class UnimplementedMappingException:Exception
{
    public UnimplementedMappingException(string mapperClassName) : base($"Ne postoji mapiranje u klasi {mapperClassName}") { }
}